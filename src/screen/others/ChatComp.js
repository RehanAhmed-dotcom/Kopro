import React, {useState, useEffect} from 'react';
import {
  View,
  Image,
  FlatList,
  Modal,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import styles from './style';
import database from '@react-native-firebase/database';
import Colors, {images} from '../../constants';
import {useSelector} from 'react-redux';
import {GetNotiGroup} from '../apis';
import Icon4 from 'react-native-vector-icons/Entypo';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const ChatComp = props => {
  const {item, alter, navigation} = props;
  const {userData} = useSelector(({USER}) => USER);
  const [groupMembers, setGroupMembers] = useState([]);
  const [show, setShow] = useState(true);
  const [modaldata, setmodaldata] = useState();
  const [mem, setmem] = useState({});
  const [revert, setRevert] = useState(false);
  const [groupUsers, setGroupUsers] = useState([]);
  const [groupUse, setGroupUse] = useState([]);
  const [group, setGroup] = useState([]);
  const [modalview, setmodalview] = useState(false);
  const Get_fcm_token = async msg => {
    const data = new FormData();
    data.append('id', item?.creatorid);
    data.append('title', `User ${userData.firstname} join your group`);

    await GetNotiGroup({Auth: userData?.api_token, data})
      .then(res => {
        console.log('--------------------------', res);
      })
      .catch(error => {
        console.log('Error FCMToke', error);
      });
  };
  const _updateGroup = async () => {
    // const removeMembers = groupAllMembers.filter(function (obj) {
    //   return selectedMembers.indexOf(obj) == -1;
    // });
    Get_fcm_token();
    try {
      group.forEach(member => {
        database().ref(`user/${member.id}`).child(`groups/${item._id}`).update({
          _id: item._id,
          groupName: item.groupName,
          groupDesc: item.groupDesc,
          groupImage: item.groupImage,
          cover: item.cover,
          members: groupMembers,
          timestamp: database.ServerValue.TIMESTAMP,
          // isGroup: true,
          counter: 0,
          groupType: item.groupType,
        });
      });

      database()
        .ref(`groups/${item._id}`)
        .update({
          _id: item._id,
          groupName: item.groupName,
          groupDesc: item.groupDesc,
          groupImage: item.groupImage,
          cover: item.cover,
          members: groupMembers,
          timestamp: database.ServerValue.TIMESTAMP,
          // isGroup: true,
          counter: 0,
          groupType: item.groupType,
        })
        .then(() => {
          setRevert(!revert);
          alter();
        });
      // console.log('removeMemebers', removeMembers);
      // removeMembers.forEach((member) => {
      //   database()
      //     .ref(`users/${member.friend_id}/groups/${groupInfo._id}`)
      //     .remove();
      // });

      // navigation.goBack();
    } catch (error) {
      console.log('error', error);
    }
  };
  useEffect(() => {
    database()
      .ref(`groups/${item._id}/members`)
      .on('value', dataSnapshot => {
        let userArr = [];
        let addUser = [userData];
        dataSnapshot.forEach(child => {
          // console.log("member specific",child.val().firstname);
          if (child.val()) {
            userArr.push(child.val());
          }
        });
        setGroupUsers(userArr);
        //   setGroupUse(userArr);
        //   setNewelectedata(userArr);
        //   setRevert(!revert)
      });
    database()
      .ref(`groups/${item._id}/members`)
      .on('value', dataSnapshot => {
        let addUser = [userData];
        dataSnapshot.forEach(child => {
          if (child.val()) {
            addUser.push(child.val());
          }
          // console.log("member specific",child.val().firstname);
        });
        setGroupUse(addUser);
        const members = addUser.reduce((pre, cur) => {
          pre[cur.id] = cur;
          return pre;
        }, {});
        setGroupMembers(members);
        setGroup(addUser);
      });
  }, [revert]);

  useEffect(() => {
    check();
  }, [groupUsers, revert]);

  const check = () => {
    //  console.log("id",id);
    //  console.log("data",userData.id);
    if (groupUsers.some(item => item.id === userData?.id)) {
      // do something
      setShow(false);
    } else {
      setShow(true);
    }
  };

  const datad = {
    15: {
      about_me: 'Hbbbbjhjn',
      age: '12',
      api_token:
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiNTI0NDE5OTRhNWQyYWZmYzE0MWE4MjMwMTRhODNiY2FlNDMzYjkwNmQyOGVmZjMwMzIyZDllZTM2NzJjZTNlNTljMzBhZGRiZTNlMTk1M2QiLCJpYXQiOjE2ODk5Mzc1ODAuMjA1ODg3LCJuYmYiOjE2ODk5Mzc1ODAuMjA1ODksImV4cCI6MTcyMTU1OTk4MC4yMDM5MTQsInN1YiI6IjE1Iiwic2NvcGVzIjpbXX0.OUapdGH4xdx0K4F7jJWBo1SysIZ3NqtyK6jZz8yeqA5eI7x-ES_0TLEuCuhw3jTpijTFZe1eYLcRUZXyPwJyi48qot_kHL1z79Sx6Kqr29D6g6SgV9FXsQwqUgelBkixUHbWhwinP0Xy-SdODwSKPw3GmQSybHIA1n2j2P8aVPMc7r2rtj8UMU7_zj-IGi6Oqgf2CktUyzFRlJzTK4heleLQWkRmu13UdaH5-j_gs7o0oIw9CEEllDmsz46hLKnMEuB_45Sw0_yrD7mJBpWDPDJ321mHtXaQoR3DqDsXAPptaLE_BQ-sMaI1ejRw7KHiTN36ayveZmKDf-Vdl00kYy9yII-vbi2VfBMVsi9xA59zVQYrrHg-LtQ7OFqJvcnU_Ix_BN4DKKO0BzawyXhfhVglgCaOIVzngSu4hFx0zoyXL0If-2B0QTFUGTxee-cNj2PVuIJk3GDARTRweheW9bPEd3clu0aZLuR7ZEaNRGH2N62Toa7r5U_NWpgLrD4K9dxWojTnVK6kSx-lhePgE5Dl-fNYBSmG6tn6QfEY8Ow9mcu8VXMd4bSc5DBlD4pYwgjadjy1LxgayUO9Jwqq9Uxpkx2WxzopDWvNcpVbxCde6kIIUQjm2SmmwLpS9Sd43f4DEDXWPsUzBhyLaK7OxZ8JqOPkfJEExaBY3fSwXFk',
      created_at: '2023-07-21T05:59:29.000000Z',
      email: 'giganik760@paldept.com',
      email_verified_at: '2023-07-21T06:00:02.000000Z',
      fcm_token:
        'cyJhoJnyTLCe6K9XMqwp72:APA91bHAZokg75KAOOTBngf6Z7BFniDJJZqnUfAOtHp6kmXP2GVoVZh-b1eQmfDDlcWWY-yJFhfPUOwrnsFzXoh2DqkJys1IDp_VRNgE7xxMpkFZ8bwJqSb45tIlMNG2tvcowTvJxr4a',
      firstname: 'From',
      gender: 'Male',
      genre: ['Reggaeton', 'EDM'],
      id: 15,
      images: [[Object]],
      instrument: ['Bass', 'Vocalist', 'Cello'],
      interest: ['Choreographer', 'Dancer'],
      lastname: 'Last',
      location: 'San Antonio',
      music_credit: 'Nndjdudb',
      status: '0',
      updated_at: '2023-07-21T11:06:20.000000Z',
      verified: '0',
    },
    3: {
      about_me: 'About myself',
      age: '12',
      api_token:
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiYTFhYjA1NzMzNGRhNjVkNDg4ZDM2ZWE1ZjI0NWJmY2FiMmMyY2FhZGFkOTA2OWMyY2E3OWIwZDJiOTQ2OWNlN2QyOWQ2Y2ViM2RlNGRjMjYiLCJpYXQiOjE2ODg5ODgxODUuMzAxMDQ2LCJuYmYiOjE2ODg5ODgxODUuMzAxMDUxLCJleHAiOjE3MjA2MTA1ODUuMjk1MTEzLCJzdWIiOiIzIiwic2NvcGVzIjpbXX0.GKya2AN8V2Vke3KNLwodyQLAFlPthAT-MtD0B1Cc33MvthiMndMWI5goHu11odNP9RlOe3hmkoBWhHCk-_tm41VVvuzd6pnrHCYte_tFBeOoW5PLEaxVUp3YJPinIkJg9xXClWR-Q82buYtr6tn5dW-qLz_V38UDHQQSZ8rU2aVV-6Aics4EFzG4mO1tws_efU-y-g_ap1ZV3bcWUKd_raiAWv5fFWK6tPAg9_1GcOh4i7_9kTipCiYA9Zix_UK95FzoluXLEpcOa2Z5z_41maA0NADcuZX42EHdOJM_-XZBKk6dZmKvhgJW6fttwdXrOaSWnxzTTT6V85xDL6CJw3sXb2CvdMxadfMi8Zwu2uduqhsMvML-pklosJcrD0Mr44Z74mqUMGb5CmEM_09gys6qMRRPaVZo3DvbWxpvPTTc4RclQX1kB1X-eEzhL_kFIwS6LMH9nUf3y-Nu02iPzczVP5JueEPOc432_JqhpCHS3-w1ZDpiCVgev6L6ViqEcMNuF7oa6dcr5PmAgL-47AkMTujE9UY7pt2T477WJ3gYpwLgsRlfRt9VWqQpEJolG3yhzagK67IUabAgZGbRkV2lEG9DlSak0bweZZJyCCDt6FUTOvhbUhVf8fdoef0aULU-1vl1QsDOKOO83NshdkzBsUfnGErYt2N1SfVibSc',
      created_at: '2023-07-10T11:23:05.000000Z',
      email: 'hokesi6671@mahmul.com',
      facebook: 'https://www.facebook.com/Hassan',
      fcm_token:
        'c5LGrb-EdESurm5Q2-SH-k:APA91bEsYY7NE6HyGXyJaxL8CKacB6LMxajwXOWDOLg-3r9iwXQHNpFA9-IKYVQJawT07gAKzHHxlyMCfAdxTaJg_3f1m-IQfDYdXVJuxCMVyCc_0XQgicdmZ0Gc0HIQ_B-q9W0EelTM',
      firstname: 'Hassan',
      gender: 'Male',
      genre: ['EDM', 'Reggaeton'],
      id: 3,
      image:
        'https://intechsol-developer.co/kolab/public/assets/images/user/1688988185_.jpg',
      instrument: ['Piano', 'Synth', 'Bass', 'Guitar'],
      interest: ['Manager', 'Lawyer', 'Film Composer'],
      lastname: 'Ali',
      location: 'Los Angeles',
      music_credit: 'Hassan',
      status: '0',
      updated_at: '2023-07-15T07:38:59.000000Z',
      verified: '1',
    },
    4: {
      about_me: 'Lorem ipsum',
      age: '27',
      api_token:
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMDBiMzQ3MTFjZGJiM2YzZTI5YTk5MDM4N2MyYjI1MzA0ZjFiZmVhMzMwNzJiZjU3NjcwMmJiMzE1NDdiODEzODgxNDk1MjVhOWE3YjljZmYiLCJpYXQiOjE2ODk5Mzc0NjUuOTg0MTAyLCJuYmYiOjE2ODk5Mzc0NjUuOTg0MTA1LCJleHAiOjE3MjE1NTk4NjUuOTc5NDk4LCJzdWIiOiI0Iiwic2NvcGVzIjpbXX0.MAJ3RCDJJnvumieRAK5UlzLSAXe33RnFx8D1ze7ewttR91_S80oaGRCcLwdXB-8j66p3wOE6v0iydHY1FDwKnGNE13pgodw01ByLn5a_Bq7ELLpamP3cWu1xftrHqVOsjlgiDTjJho-WJYFj59FUs_h6UkFKNyEqDmXA9ab2gMY205GZCLMTgqEifTwle0_ZUgNumILUOsqjWQ03hXKSTKDqIWXM2WObrhwoI1706cfkJYNqsY-cRYcwWhPkfAB905Un4IEBMEyiJMiD-P20prTQrAB8Nu14X_mocVXoe5ctTvOVt4CsxAti46GqElffEuXZf75d26yEnKRundZs2ulF5wsBuu-PF8YkKPVf0UkRXzHqBiKNdCBRyeeiiFqV8kU_yPeJmZxAT2P9NjoS_5roikJRuiFRzfjjF7G7gFdNViw7s_oHV8sNuqca1gf6o8pVaL10KrDcuIK35JJJWro7oqFkG-CN7mqmt_yH59FT5Cc8qQ4bB7DOItJsnqLvLXvdS2yYsYyFE4Tl3ObZOYszkHIxzJwn94o_rsHLxJ0aYBoUlSObSsFmVJ3CISPpaip3kVu2IZ2BIKN63UE7RlVAVSeC7nvmzFEnsjWsV1_zCrUNxickIMGdPkHxgW8GiajAfqFFvKn540V5xts4dRRplr1AgPT4KzpUJvKIeMU',
      created_at: '2023-07-10T12:01:05.000000Z',
      email: 'saadey7@gmail.com',
      email_verified_at: '2023-07-21T09:57:35.000000Z',
      facebook: 'https://www.facebook.com/mughalshb733',
      fcm_token:
        'fLGMCbUsQjSMuys4CQSkGd:APA91bGyHlQ3hVTTpQUrbbe7dqXNahYSmF_9RF0ehoWvKBI02uuMkrmDWHQwHmSD0fYYh0nG2FWSZNkXrH_dl59gxxp-ZomkWXswZkTlQtJM-48Gc-rSrNn2HmAF6n7UDAru0-uGpJJo',
      firstname: 'Saad',
      gender: 'Male',
      genre: ['Lawyer'],
      id: 4,
      image:
        'https://intechsol-developer.co/kolab/public/assets/images/user/1688990465_.jpg',
      images: [[Object], [Object]],
      instrument: ['Lawyer'],
      interest: ['Lawyer'],
      lastname: 'Mughal',
      location: 'San Antonio',
      music_credit: 'undefined',
      status: '0',
      updated_at: '2023-07-21T11:04:25.000000Z',
      verified: '0',
    },
    8: {
      about_me: 'Sjdbfslbfs',
      age: '12',
      api_token:
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMDM3NjEyYzZhYTI4MTZmNTdhYmMyMGRkMzI1Y2MyZDAwOGI3MzM4MGJkOGEwMTFlOGRmMGMxNDM0MjUxYzdkMDBmNzliNWMzM2QxNDY3ZGUiLCJpYXQiOjE2ODkzMDkyNjAuNTk3MjAxLCJuYmYiOjE2ODkzMDkyNjAuNTk3MjA0LCJleHAiOjE3MjA5MzE2NjAuNTkyNDc3LCJzdWIiOiI4Iiwic2NvcGVzIjpbXX0.PAyFZnkk5QcBIAqk5X-Yt2eoWUiYehObS7VUTluIde4M6obeHmBlRh-R6Q94usXvSmVPCaSr1pcLwFZSNweQt3SAWfcCzHyNIpHa_MJu-j0MeC6eksMRJmh2GngT9PXZdoasykNf1x85rsiRwPtpT23_zbPnyZwvlYDS8lZjI2pVfXO7Pwa6IUgGYGVtiVO2yXHp9-rqr89aU4h9UgHJXd1txJsXBLkIj8ITQvZvN0Bxgsdj2RmlUZydrDIcNkeujnejmftLM_va2drFiItiCk-hUsLwFfjkbf4fdfGcwXOKNWUQKROA9Um7LEZTBQj53EvQaVl78jPpq1j8opPfn036rjbRNIgWE6kLZO5C0kHuPsgW2yoLQ4NeOruQNluN3rsUbmzbmq2xD8D_qX8AVo1iwpbizgY78gHkJn4vg4456d3TRM2dN-wV00hCgA_LCURYdD8X7zPJHM3eRFNyza9ell_Zb_Ks5J3XdDmLL2B4zOmbwLAvyWAXrOKSnBxOeZukD_-J6cgKvBP_2qSeea39-bwBq_tcxOmYYITJU4f0oKNtVEagtv0MzMSJ2err8XXQPuB-eOHtdqRZqcx3m-VplcPoKSRSU3LjT8buyQ1zopcNeIHfDDBp2Ye4vodvMsIWZ-pOu0Vc9nNfF6MK3CMWVbzCpB0d9TQeTd42kVs',
      created_at: '2023-07-14T04:34:20.000000Z',
      email: 'liwis34393@lukaat.com',
      fcm_token:
        'c5LGrb-EdESurm5Q2-SH-k:APA91bEsYY7NE6HyGXyJaxL8CKacB6LMxajwXOWDOLg-3r9iwXQHNpFA9-IKYVQJawT07gAKzHHxlyMCfAdxTaJg_3f1m-IQfDYdXVJuxCMVyCc_0XQgicdmZ0Gc0HIQ_B-q9W0EelTM',
      firstname: 'Test',
      gender: 'Male',
      genre: ['Trap', 'R&B'],
      id: 8,
      image:
        'https://intechsol-developer.co/kolab/public/assets/images/user/1689309260_.jpg',
      instrument: ['Laptop', 'Synth'],
      interest: ['Musician', 'Artist'],
      lastname: 'It',
      location: 'Los Angeles',
      music_credit: 'Jkhdsfljhdlfkjdf',
      status: '0',
      updated_at: '2023-07-19T06:14:03.000000Z',
      verified: '0',
    },
    9: {
      about_me: 'undefined',
      age: '30',
      api_token:
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiZjIxYzRjMGY5ZGE0NTYyNjkxOWRlN2NkMGM3OTcxYmUwZWViOWJmZmMzNGJkMTllYWU3MTZkZWUxMTAwZDkwOWVhNmE3NTAzYTA2MmVkZTkiLCJpYXQiOjE2ODk3NDc4MDIuNjEyMjE0LCJuYmYiOjE2ODk3NDc4MDIuNjEyMjE4LCJleHAiOjE3MjEzNzAyMDIuNjAzMTY3LCJzdWIiOiI5Iiwic2NvcGVzIjpbXX0.nfLl0VmrKgTUvZFRDBw-AB8-XgorIis1B3PKJTaJdtuWsjwuTFrMz2nhtm575bka13YqvOcR90uA1z2FNxv4lesyr40bML848WisFydvXbX3KJCDag2rT7jhzTYbzfSVnB_iIrwsFdg_CNve5FPA1BSkOG9ew7gzWVHCOrcj5hOL0ZnUl-DyS3-XyjBjBjQVDT8M6KVhWrJCBR9V7SB65wyAtD8xHRgcAmQI_JO4jDLelF5KADKsc7--LPjhCJPWV-zUG1tj4h_kieWrwyJMbjZz9f8Bg7izHS-nXhhYvOCCagtUizO9Bm3VtCfaYRmCuZ1Tr96T94K8xuqq91AhhyZ9e1BhxJOdKEW445eIMZzpjDPFvfhK46U0NzUveN0ySRo9Ntpq7bbaadvvjWZD0TcZ694RG0s21Vmo8ro007dPF8lYJvcCtpGD01hM_rMDQIxk_rQeol9lafvQyphRlwTt0_R3l392UXJ9vo4ILPg-C2f6YuBPxecKKEt9sIvFKEsT6YotfENdDlx-DO-pR_-YvDB_xr4KZRmkUsgniFPrZuIcSKmtcK2mtWNqtkLYFwWs5pn0mCJNv5wC6OeP3ceNjQThOeCaDgDVeztEArY9yCIEJtbDas0fpEjxgZ7pQcuf0v8uTvaB4tegRUTZdD-ApLp_1HFFEyqwp-MPv5A',
      created_at: '2023-07-15T06:00:10.000000Z',
      email: 'thejordanaire@gmail.com',
      email_verified_at: '2023-07-15T06:00:51.000000Z',
      fcm_token:
        'c5LGrb-EdESurm5Q2-SH-k:APA91bEsYY7NE6HyGXyJaxL8CKacB6LMxajwXOWDOLg-3r9iwXQHNpFA9-IKYVQJawT07gAKzHHxlyMCfAdxTaJg_3f1m-IQfDYdXVJuxCMVyCc_0XQgicdmZ0Gc0HIQ_B-q9W0EelTM',
      firstname: 'Jordan',
      gender: 'Male',
      genre: ['Hip Hop', 'Trap', 'EDM', 'Soul', 'Pop Punk'],
      id: 9,
      image:
        'https://intechsol-developer.co/kolab/public/assets/images/user/1689408643_.jpg',
      instagram: 'https://www.instagram.com/Jordanxl',
      instrument: ['Laptop', 'Synth', 'Guitar'],
      interest: ['Producer', 'Songwriter', 'Musician'],
      lastname: 'XL',
      location: 'Los Angeles',
      music_credit:
        'Im a producer from Boston living in Los Angeles  I  specialize in live instruments',
      status: '0',
      updated_at: '2023-07-21T06:06:49.000000Z',
      verified: '0',
    },
  };

  return (
    <>
      {/* {show && ( */}
      <View style={styles.boxinside}>
        <Image
          source={item?.cover == '' ? images.grp : {uri: item?.cover}}
          style={styles.pic}
          resizeMode="cover"
        />

        <View style={styles.topmain}>
          <View style={styles.main}>
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text style={styles.mem}>{item.groupName}</Text>
              <Text style={styles.mem1}>{groupUsers.length} members</Text>
            </View>
            {/* <Text style={styles.mem}>{arydata.length} Members</Text> */}
          </View>

          <View style={styles.detail}>
            <Text style={styles.detail_title}>{item.group_name}</Text>
            <Text style={styles.detail_text}>{item.group_about}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginHorizontal: wp(5),
            }}>
            {show ? (
              <TouchableOpacity
                style={[
                  styles.join,
                  {backgroundColor: show ? Colors.main_back_color : 'white'},
                ]}
                onPress={() => {
                  // console.log("hello")
                  console.log('item id', item._id);
                  _updateGroup();
                  navigation.navigate('labchat', {item});
                }}>
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: 'MontserratAlternates-SemiBold',
                    letterSpacing: 1,
                    color: show ? 'white' : Colors.main_back_color,
                  }}>
                  Join Group
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={[
                  styles.join,
                  {backgroundColor: show ? Colors.main_back_color : 'white'},
                ]}
                onPress={() => {
                  // console.log(item);
                  console.log('item id', item._id);
                  database()
                    .ref(`user/${userData?.id}/groups/${item._id}`)
                    .push();
                  database()
                    .ref(`groups/${item._id}/members/${userData?.id}`)
                    .remove()
                    .then(() => {
                      setRevert(!revert);
                      alter();
                    });
                }}>
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: 'MontserratAlternates-SemiBold',
                    letterSpacing: 1,
                    color: show ? 'white' : Colors.main_back_color,
                  }}>
                  Unjoin
                </Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={{
                backgroundColor: '#9b1b95',
                width: wp(28),
                height: hp(4.5),

                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: wp(5),
              }}
              onPress={() => {
                setmodalview(true), setmodaldata(item), setmem(item.members);
              }}>
              <Text style={{fontSize: 12, fontWeight: '600', color: 'white'}}>
                Group Details
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <Modal animationType="fade" visible={modalview} transparent={true}>
          <View style={styles.boxmodal}>
            <View style={styles.boxinsidemodal}>
              <View>
                <Text
                  style={{fontSize: 16, color: '#9b1b95', fontWeight: 'bold'}}>
                  Created By:
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    color: 'white',
                    fontWeight: '400',
                    marginLeft: wp(10),
                    marginVertical: hp(1),
                  }}>
                  {modaldata?.creator}
                </Text>
                <Text
                  style={{fontSize: 16, color: '#9b1b95', fontWeight: 'bold'}}
                  numberOfLines={2}
                  ellipsizeMode="tail">
                  Description:
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    color: 'white',
                    fontWeight: '400',
                    marginLeft: wp(10),
                    marginVertical: hp(1),
                  }}
                  numberOfLines={2}
                  ellipsizeMode="tail">
                  {modaldata?.groupDesc}
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    color: '#9b1b95',
                    fontWeight: 'bold',
                    marginBottom: hp(1.5),
                  }}>
                  Members:
                </Text>
                <ScrollView scrollEnabled={true} nestedScrollEnabled={true}>
                  <View
                    style={{
                      // flex: 1,
                      backgroundColor: 'red',
                      paddingBottom: hp(15),
                    }}>
                    {Object.keys(mem).map(key => (
                      <TouchableOpacity
                        style={{
                          marginBottom: wp(3),
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}
                        onPress={() => {
                          setmodalview(false),
                            navigation.navigate('producerdetail', {
                              dataitem: mem[key]?.id,
                            });
                        }}>
                        <Image
                          source={
                            mem[key]?.image == null
                              ? images.profileimg
                              : {uri: mem[key]?.image}
                          }
                          style={{
                            width: wp(10),
                            height: wp(10),
                            borderRadius: wp(5),
                          }}
                          resizeMode="contain"
                        />
                        <View
                          style={{flexDirection: 'column', marginLeft: wp(5)}}>
                          <Text style={{color: 'white', fontSize: 14}}>
                            {mem[key]?.firstname + ' ' + mem[key]?.lastname}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    ))}
                  </View>
                </ScrollView>
              </View>
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  right: -5,
                  top: -5,
                }}
                onPress={() => {
                  setmodalview(false);
                }}>
                <Icon4 name="circle-with-cross" size={28} color="red" />
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
      {/* )} */}
    </>
  );
};
export default ChatComp;
