import Person3Icon from '@mui/icons-material/Person3';
import PersonIcon from '@mui/icons-material/Person';
import GroupIcon from '@mui/icons-material/Group';


import AssignmentIcon from '@mui/icons-material/Assignment';

const admin = [ 
  {
      content: "Student",
      path: "/admin-layout/student", 
      icon: <PersonIcon/>
    },
    {
      content: "Teacher",
      path: "/admin-layout", 
      icon:<Person3Icon/>
    },
    
    {
      content: "Course",
      path: "/admin-layout/course", 
      icon:<AssignmentIcon/>
    },
    {
      content: "Group",
      path: "/admin-layout/group", 
      icon: <GroupIcon/>
    }
  ]
  
const student =[ 
    {}
]
export {admin,student }