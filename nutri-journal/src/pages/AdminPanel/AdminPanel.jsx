import AdminFoodCreate from '../../components/AdminFoodCreate/AdminFoodCreate';
import AdminFoodDelete from '../../components/AdminFoodDelete/AdminFoodDelete';
import AdminFoodUpdate from '../../components/AdminFoodUpdate/AdminFoodUpdate';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { useState } from "react";

export default function AdminPanel() {

  const [adminUpdate, setAdminUpdate] = useState(false);

  return (
    <>
      <Tabs defaultActiveKey="Create" id="justify-tab-example" className="mb-3" justify>
        <Tab eventKey="Create" title="Create">
          <AdminFoodCreate
            adminUpdate={adminUpdate} setAdminUpdate={setAdminUpdate}
          />
        </Tab>
        <Tab eventKey="Update" title="Update">
          <AdminFoodUpdate
            adminUpdate={adminUpdate} setAdminUpdate={setAdminUpdate}
          />
        </Tab>
        <Tab eventKey="Delete" title="Delete">
          <AdminFoodDelete
            adminUpdate={adminUpdate} setAdminUpdate={setAdminUpdate}
          />
        </Tab>
      </Tabs>
    </>
  );
}





