import React,{useState} from "react";
import Header from './Header';
import Panel from './Panel';
import Notification from "./Notification";

const Performnotipage = ({ setFilteredItems }) => {
    const [showPanel,setShowPanel] = useState(false)
    return (
        <div>
              <Header setShowPanel={setShowPanel} />
            <Panel setFilteredItems={setFilteredItems} />
            <Notification />
        </div>
    );
}
export default Performnotipage;