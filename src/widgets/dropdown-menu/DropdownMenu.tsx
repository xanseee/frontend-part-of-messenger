import { useEffect, useRef, useState } from 'react'
import classes from './DropdownMenu.module.css'
import { FiUser, FiPlus, FiBookmark, FiMessageSquare, FiSettings, FiMoreHorizontal, FiMenu, FiCreditCard } from "react-icons/fi";

const DropdownMenu: React.FC = () => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setOpen(false);
    }
  };
  
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className={classes.menuWrapper}>
      <button onClick={() => setOpen(!open)} className={classes.menuButton}>
        <FiMenu size={20} />
      </button>

      {open && (
        <div className={classes.menuList}>
          <div className={classes.menuHeader}>
            <div className={classes.avatar}>X</div>
            <span className={classes.menuText}>Xansee</span>
          </div>

          <div className={classes.divider}></div>

          <MenuItem icon={<FiPlus />} text="Add Account" />
          <MenuItem icon={<FiBookmark />} text="Saved Messages" />
          <MenuItem icon={<FiMessageSquare />} text="Archived Chats" />
          <MenuItem icon={<FiUser />} text="Contacts" />
          <MenuItem icon={<FiCreditCard />} text="Wallet" />
          <MenuItem icon={<FiSettings />} text="Settings" />
          <MenuItem icon={<FiMoreHorizontal />} text="More" />
        </div>
      )}
    </div>
  );
};

interface MenuItemProps {
  icon: React.ReactNode;
  text: string;
  onClick?: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ icon, text, onClick }) => (
  <div onClick={onClick} className={classes.menuItem}>
    <span className={classes.icon}>{icon}</span>
    <span>{text}</span>
  </div>
);

export default DropdownMenu;