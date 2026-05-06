import Image from "next/image";
import Link from "next/link";
import "./style.css";
import { MdChatBubble } from "react-icons/md";
import { FaHome } from "react-icons/fa";
import { RiAdminFill } from "react-icons/ri";
import { IoPeopleSharp } from "react-icons/io5";


export function Sidebar() {
    return (
        <>
            <div className="sideBar">
                <nav>
                    <header>
                        <Link href='/logged/inicio' className="linkHeader">
                            <img src="/logobranca.png" alt="" />

                            <h1>AndradeMartes</h1>
                        </Link>
                    </header>

                    <div className="sideBarItens">
                        <ul>
                            <Link href='/logged/inicio'>
                                <li><FaHome className="icon" /> Início</li>
                            </Link>
                            <Link href='/logged/leads'>
                                <li><IoPeopleSharp className="icon" /> Leads</li>
                            </Link>
                            <Link href='/logged/conversas'>
                                <li><MdChatBubble className="icon" /> Conversas</li>
                            </Link>
                            <Link href='/logged/admin'>
                                <li><RiAdminFill className="icon" /> Admin</li>
                            </Link>
                        </ul>
                    </div >
                </nav >
            </div >
        </>
    )
}