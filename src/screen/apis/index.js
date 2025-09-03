import React, {useEffect, useState} from 'react';

import Axios from 'axios';

import {useSelector} from 'react-redux';

const axios = Axios.create({
  // baseURL: 'https://kopro.app/api/api',
  // baseURL: 'https://test.ahsanix.com/api',
  baseURL: 'https://intechsol-developer.co/kolab/api',
  headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
});
const authorizedHeaders = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
  Authorization: '',
};

const registerions = payload => {
  console.log('reg Datat', payload);
  const request = `/register`;
  const header = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
  };
  return axios
    .post(request, payload, header)
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in catch register', e);
      throw e;
    });
};
const logins = payload => {
  console.log('Fcm token in signup -0-0-0-0-0-0-0-0-0-0', payload);
  const request = `/login`;
  console.log('{}{}{}{}{}{}{}{} ', payload);
  const header = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
  };
  return axios
    .post(request, payload, header)
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in catch register', e);
      throw e;
    });
};
const imagePath = payload => {
  console.log('Fcm token in signup -0-0-0-0-0-0-0-0-0-0', payload);
  const request = `/imagePath`;
  console.log('{}{}{}{}{}{}{}{} ', payload);
  const header = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
  };
  return axios
    .post(request, payload, header)
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in catch register', e);
      throw e;
    });
};
const forgot = payload => {
  console.log('Fcm token in forgot -0-0-0-0-0-0-0-0-0-0', payload);
  const request = `/forgot`;
  console.log('{}{}{}{}{}{}{}{} ', payload);
  const header = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
  };
  return axios
    .post(request, payload, header)
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('reqqeq', request);
      console.log('in catch register', e);
      throw e;
    });
};
const verifysignup = payload => {
  console.log('Fcm token in confirm-code -0-0-0-0-0-0-0-0-0-0', payload);
  const request = `/verify`;
  console.log('{}{}{}{}{}{}{}{} ', payload);
  const header = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
  };
  return axios
    .post(request, payload, header)
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in catch register', e.response);
      throw e;
    });
};
const verify = payload => {
  console.log('Fcm token in confirm-code -0-0-0-0-0-0-0-0-0-0', payload);
  const request = `/confirm-code`;
  console.log('{}{}{}{}{}{}{}{} ', payload);
  const header = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
  };
  return axios
    .post(request, payload, header)
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in catch register', e);
      throw e;
    });
};
const passwordapi = payload => {
  console.log('Fcm token in password -0-0-0-0-0-0-0-0-0-0', payload);
  const request = `/reset`;
  console.log('{}{}{}{}{}{}{}{} ', payload);
  const header = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
  };
  return axios
    .post(request, payload, header)
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in catch register', e);
      throw e;
    });
};
const changepass = payload => {
  console.log('Add tO Favrouit ', payload);

  const request = `/change-password`;

  const header = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${payload.Auth}`,
    },
  };
  return axios
    .post(request, payload.data, header)
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in catch register', e);
      throw e;
    });
};
const GetFCM = payload => {
  const request = `/getFCM`;

  const header = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${payload.Auth}`,
    },
  };
  return axios
    .post(request, payload.data, header)
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in catch register', e);
      throw e;
    });
};
const GetNotiGroup = payload => {
  const request = `/sendNotify`;

  const header = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${payload.Auth}`,
    },
  };
  return axios
    .post(request, payload.data, header)
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in catch register', e);
      throw e;
    });
};
const GetNotiGroupArr = payload => {
  const request = `/sendNotifyArray`;

  const header = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${payload.Auth}`,
    },
  };
  return axios
    .post(request, payload.data, header)
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in catch register', e);
      throw e;
    });
};

const profileDetail = payload => {
  console.log('Add tO Favrouit ', payload);

  const request = `/details`;

  const header = {
    headers: {
      Accept: 'application/json',
      // 'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${payload.Auth}`,
    },
  };
  return axios
    .get(request, header)
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in catch register', e);
      throw e;
    });
};

const Addimgs = payload => {
  console.log('Add tO Favrouit ', payload);

  const request = `/add_images`;

  const header = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${payload.Auth}`,
    },
  };
  return axios
    .post(request, payload.data, header)
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in catch register', e);
      throw e;
    });
};

const EditInterest = payload => {
  console.log('Add tO Favrouit ', payload);

  const request = `/edit_interest`;

  const header = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${payload.Auth}`,
    },
  };
  return axios
    .post(request, payload.data, header)
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in catch register', e);
      throw e;
    });
};

const updateRedux = payload => {
  console.log('Add tO Favrouit ', payload);

  const request = `/update_redux`;

  const header = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${payload.Auth}`,
    },
  };
  return axios
    .get(request, header)
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in catch register update', e);
      throw e;
    });
};

const EditProfile = payload => {
  console.log('paylod for genre and music ', payload);

  const request = `/edit`;

  const header = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${payload.Auth}`,
    },
  };
  return axios
    .post(request, payload.data, header)
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in catch register ff', e);
      throw e;
    });
};

const searchApi = payload => {
  console.log('Add tO Favrouit ', payload);

  const request = `/searchUser`;

  const header = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${payload.Auth}`,
    },
  };
  return axios
    .post(request, payload.data, header)
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in catch register rr', e);
      throw e;
    });
};

const LikeApi = payload => {
  console.log('Add tO Favrouit ', payload);

  const request = `/like`;

  const header = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${payload.Auth}`,
    },
  };
  return axios
    .post(request, payload.data, header)
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in catch register rrw', e);
      throw e;
    });
};
const Dislikeapi = payload => {
  console.log('Add tO Favrouit ', payload);

  const request = `/dislike`;

  const header = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${payload.Auth}`,
    },
  };
  return axios
    .post(request, payload.data, header)
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in catch registe er', e);
      throw e;
    });
};
const SearchByNameApi = payload => {
  console.log('Add tO Favrouit ', payload);

  const request = `/searchByName`;

  const header = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${payload.Auth}`,
    },
  };
  return axios
    .post(request, payload.data, header)
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in catch regifjfster', e);
      throw e;
    });
};

const HomeApi = payload => {
  console.log('Add tO Favrouit ', payload);
  const request = `/home`;
  const header = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${payload.Auth}`,
    },
  };
  return axios
    .get(request, header)
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in catch register hm', e);
      throw e;
    });
};
const detailApi = payload => {
  console.log('Add tO Favrouit ', payload);
  const request = `/showProfile/${payload.id}`;
  const header = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${payload.Auth}`,
    },
  };
  return axios
    .get(request, header)
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in catch register hm', e);
      throw e;
    });
};
const detailApiForm = payload => {
  console.log('Add tO Favrouit ', payload);
  const request = `/showProfile`;
  const header = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${payload.Auth}`,
    },
  };
  return axios
    .post(request, payload.data, header)
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in catch register jgu', e);
      throw e;
    });
};
const Notify = payload => {
  console.log('Add tO Favrouit ', payload);
  const request = `/viewAllNotification`;
  const header = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${payload.Auth}`,
    },
  };
  return axios
    .get(request, header)
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in catch register jhdh', e.response);
      throw e;
    });
};
const Notifytrue = payload => {
  console.log('Add tO Favrouit ', payload);
  const request = `/changeStatusNotification`;
  const header = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${payload.Auth}`,
    },
  };
  return axios
    .get(request, header)
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in catch register ff', e);
      throw e;
    });
};
const AccountApproval = payload => {
  console.log('Add tO Favrouit ', payload);
  const request = `/request`;
  const header = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${payload.Auth}`,
    },
  };
  return axios
    .get(request, header)
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in catch register', e);
      throw e;
    });
};
const logoutMan = payload => {
  const request = `/logout`;
  const header = {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${payload.Auth}`,
    },
  };
  return axios
    .get(request, header)
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in catch register', e);
      throw e;
    });
};
const AccountDelete = payload => {
  console.log('Add tO Favrouit ', payload);
  const request = `/delete-user`;
  const header = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${payload.Auth}`,
    },
  };
  return axios
    .get(request, header)
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in catch register', e);
      throw e;
    });
};

const fcm_Update = payload => {
  // console.log('Add tO Favrouit ', payload);
  const request = `/update-fcm`;
  const header = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${payload.Auth}`,
    },
  };
  return axios
    .post(request, payload.data, header)
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in catch register fcm', e);
      throw e;
    });
};

const groupCreate = payload => {
  console.log('Add tO Favrouit ', payload);
  const request = `/addGroup`;
  const header = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${payload.Auth}`,
    },
  };
  return axios
    .post(request, payload.data, header)
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in catch register', e);
      throw e;
    });
};

const showAllgroup = payload => {
  console.log('Add tO Favrouit ', payload);
  const request = `/showallGroup`;
  const header = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${payload.Auth}`,
    },
  };
  return axios
    .get(request, header)
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in catch register', e);
      throw e;
    });
};

const myGroup = payload => {
  console.log('Add tO Favrouit ', payload);
  const request = `/showmyGroup`;
  const header = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${payload.Auth}`,
    },
  };
  return axios
    .get(request, header)
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in catch register', e);
      throw e;
    });
};
const show_user_list = payload => {
  console.log('Add tO Favrouit ', payload);
  const request = `/userList`;
  const header = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${payload.Auth}`,
    },
  };
  return axios
    .get(request, header)
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in catch register', e);
      throw e;
    });
};

const AddMemberMore = payload => {
  console.log('Add tO Favrouit ', payload);
  const request = `/addMoreMember`;
  const header = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${payload.Auth}`,
    },
  };
  return axios
    .post(request, payload.data, header)
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in catch register', e);
      throw e;
    });
};

const sendUserList = payload => {
  // console.log('Add tO Favrouit ', payload);
  const request = `/userList1`;
  const header = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${payload.Auth}`,
    },
  };
  return axios
    .get(request, header)
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in catch register', e);
      throw e;
    });
};

const Addjob = payload => {
  console.log('Add tO Favrouit ', payload);
  const request = `/addjob`;
  const header = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${payload.Auth}`,
    },
  };
  return axios
    .post(request, payload.data, header)
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in catch register', e);
      throw e;
    });
};
const DeleteJob = payload => {
  console.log('Add tO Favrouit ', payload);
  const request = `/deleteJob`;
  const header = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${payload.Auth}`,
    },
  };
  return axios
    .post(request, payload.data, header)
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in catch register', e);
      throw e;
    });
};

const My_total_jobs = payload => {
  console.log('Add tO Favrouit ', payload);
  const request = `/myJob`;
  const header = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${payload.Auth}`,
    },
  };
  return axios
    .get(request, header)
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in catch register', e);
      throw e;
    });
};
const ShowAllJobsHere = payload => {
  console.log('Add tO Favrouit ', payload);
  const request = `/showAllJob`;
  const header = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${payload.Auth}`,
    },
  };
  return axios
    .get(request, header)
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in catch register', e);
      throw e;
    });
};

const showjobSearch = payload => {
  console.log('Add tO Favrouit ', payload);
  const request = `/searchJob`;
  const header = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${payload.Auth}`,
    },
  };
  return axios
    .post(request, payload.data, header)
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in catch register', e);
      throw e;
    });
};
const showallexplore = payload => {
  console.log('Add tO Favrouit ', JSON.stringify(payload));
  const request = `/searchUser`;
  const header = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${payload.Auth}`,
    },
  };
  return axios
    .post(request, payload.data, header)
    .then(({data, status}) => {
      console.log('data', status);
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in catch register', e);
      throw e;
    });
};

const ApplyForTheJob = payload => {
  console.log('Add tO Favrouit ', payload);
  const request = `/applyJob`;
  const header = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${payload.Auth}`,
    },
  };
  return axios
    .post(request, payload.data, header)
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in catch register', e);
      throw e;
    });
};
const EditMyPost = payload => {
  console.log('Add tO Favrouit ', payload);
  const request = `/editJob`;
  const header = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${payload.Auth}`,
    },
  };
  return axios
    .post(request, payload.data, header)
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in catch register', e);
      throw e;
    });
};
const locationData = payload => {
  console.log('Add tO Favrouit ', payload);
  const request = `/location`;
  const header = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
  };
  return axios
    .get(request, header)
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in catch register', e);
      throw e;
    });
};
const genreData = payload => {
  console.log('Add tO Favrouit ', payload);
  const request = `/all_genre`;
  const header = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
  };
  return axios
    .get(request, header)
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in catch register', e);
      throw e;
    });
};
const instrumentData = payload => {
  console.log('Add tO Favrouit ', payload);
  const request = `/all_instrument`;
  const header = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
  };
  return axios
    .get(request, header)
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in catch register', e);
      throw e;
    });
};
const talentData = payload => {
  console.log('Add tO Favrouit ', payload);
  const request = `/all_talent`;
  const header = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
  };
  return axios
    .get(request, header)
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in catch register', e);
      throw e;
    });
};

const EditInstrument = payload => {
  console.log('Add tO Favrouit ', payload);

  const request = `/edit_instrument`;

  const header = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${payload.Auth}`,
    },
  };
  return axios
    .post(request, payload.data, header)
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in catch register', e);
      throw e;
    });
};
const EditGenre = payload => {
  console.log('Add tO Favrouit ', JSON.stringify(payload));

  const request = `/edit_genre`;

  const header = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${payload.Auth}`,
    },
  };
  return axios
    .post(request, payload.data, header)
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in catch register', e);
      throw e;
    });
};
const Image_set = payload => {
  console.log('Add tO Favrouit ', payload);
  const request = `/imagePath`;
  const header = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
  };
  return axios
    .post(request, payload, header)
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in catch register', e);
      throw e;
    });
};
const HomeProfile = payload => {
  console.log('Add tO Favrouit ', payload);
  const request = `/myprofile`;
  const header = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${payload.Auth}`,
    },
  };
  return axios
    .get(request, header)
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in catch register', e);
      throw e;
    });
};
const AllUsersMesg = payload => {
  console.log('Add tO Favrouit ', payload);
  const request = `/allFriend`;
  const header = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${payload.Auth}`,
    },
  };
  return axios
    .post(request, payload.data, header)
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in catch register', e);
      throw e;
    });
};
const Friends_data = payload => {
  console.log('Add tO Favrouit ', payload);

  const request = `/myfriendlist`;

  const header = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${payload.Auth}`,
    },
  };
  return axios
    .post(request, payload.data, header)
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in catch register', e);
      throw e;
    });
};
export {
  logoutMan,
  AllUsersMesg,
  fcm_Update,
  imagePath,
  registerions,
  logins,
  forgot,
  verify,
  passwordapi,
  changepass,
  profileDetail,
  Addimgs,
  EditInterest,
  updateRedux,
  detailApi,
  EditProfile,
  searchApi,
  LikeApi,
  Dislikeapi,
  GetFCM,
  SearchByNameApi,
  HomeApi,
  Notify,
  AccountApproval,
  groupCreate,
  showAllgroup,
  myGroup,
  show_user_list,
  AddMemberMore,
  sendUserList,
  Addjob,
  My_total_jobs,
  ShowAllJobsHere,
  ApplyForTheJob,
  EditMyPost,
  locationData,
  EditInstrument,
  Image_set,
  showjobSearch,
  AccountDelete,
  EditGenre,
  genreData,
  instrumentData,
  talentData,
  HomeProfile,
  Friends_data,
  Notifytrue,
  detailApiForm,
  showallexplore,
  verifysignup,
  GetNotiGroup,
  GetNotiGroupArr,
  DeleteJob,
};
