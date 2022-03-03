
import Description from '../component/Description';
import ToDoList from '../component/ToDoList';

const routes =[
  
    {
      path:'*/todo/:id',
      component: Description,
      isPrivate : false
    },
    {
      path:'/',
      component: ToDoList,
      isPrivate : false
    },
  ]
   
  export default routes