import { Button } from "../components/ui/Button";
import "../App.css";
import PlusIcon from "../Icons/PlusIcon";
import ShareIcon from "../Icons/ShareIcon";
import Card from "../components/ui/Card";
import CreateContentModel from "../components/ui/CreateContentModel";
import { useEffect, useState } from "react";
import { Sidebar } from "../components/ui/SideBar";
import { Toaster } from "sonner";
import useContent from "../hooks/useContent";
function DashBoard() {
  const [modalOpen, setModalOpen] = useState(false);
  const { contents,refresh } = useContent();
  useEffect(() => {
    refresh();
  }, [modalOpen])
  return (
    <div className="">
      
      <Sidebar />
      <div className="p-4 ml-72 min-h-screen bg-gray-100 border-2">
        <CreateContentModel
          open={modalOpen}
          onClose={() => {
            setModalOpen(false);
          }}
        />
        <div className="flex justify-end gap-4">
          <Button
            variant="primary"
            onClick={() => {
              setModalOpen(true);
            }}
            text="Add Content"
            startIcon={<PlusIcon />}></Button>
          <Button
            variant="secondary"
            text="Share Brain"
            startIcon={<ShareIcon />}></Button>
        </div>
        <div className="flex gap-4 pt-4 flex-wrap">
          {contents.map(({type,link,title})=>{
            return (
              <Card
                type={type}
                link={link}
                title={title}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default DashBoard;
