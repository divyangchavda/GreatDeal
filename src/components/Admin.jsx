import {React,useState}from 'react';
import '../style/admin.css';

import Adminheader from './Adminheader.jsx';
import Adminpanel from '././Adminpanel.jsx';

import Adminperform from '././Adminperform.jsx';

function Admin() {
    const [selectedItems,setselectedItem] = useState([]);
    const [showPanel,setShowPanel] = useState(false);
    const [search,setSearch] = useState('');
    return(
        <div className='admin'>
            <div className='admin-header-div'> 
            <Adminheader  setShowPanel={setShowPanel} setSearch={setSearch}/>
            </div>
             <div className='admin-body'>
            <Adminpanel setselectedItem={setselectedItem}  showPanel={showPanel} search={search} />
            <Adminperform  selectedItems={selectedItems} />
             </div>
            

          
        </div>
        
    )
      
    

}
export default Admin;