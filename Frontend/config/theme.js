import { GrCamera, GrGallery } from "react-icons/gr";
import { Icon } from "native-base";
import { MaterialIcons } from '@expo/vector-icons';
import {Ionicons} from '@expo/vector-icons';

const icon =()=>{
  
}
export const icons = {
  camera: <MaterialIcons name="add-a-photo" size={24} color="black" />,
  gallery: <MaterialIcons name="add-photo-alternate" size={24} color="black" />,
  bottom_nav:{
    globe: <Ionicons name="globe-sharp" size={24}/>,
    add: <Ionicons name="add" size={24}/>
  }


}