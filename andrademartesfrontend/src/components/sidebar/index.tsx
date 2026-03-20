import Image from "next/image";
import Link from "next/link";
import "./style.css";
import { MdDashboard, MdChatBubble, MdSettings } from "react-icons/md";
import { FaUser, FaHome } from "react-icons/fa";
import { FaClipboardUser } from "react-icons/fa6";


export function Sidebar() {
    return (
        <>
            <div className="sideBar">
                <nav>
                    <header>
                        <Link href='/inicio' className="linkHeader">
                            <img src="/andrademartesLogoBranco.svg" alt="" />

                            <h1>AndradeMartes</h1>
                        </Link>
                    </header>

                    <div className="sideBarItens">
                        <ul>
                            <Link href='/inicio'>
                                <li><FaHome className="icon" /> Início</li>
                            </Link>
                            <Link href='/dashboard'>
                                <li><MdDashboard className="icon" /> Dashboard</li>
                            </Link>
                            <Link href='/conversas'>
                                <li><MdChatBubble className="icon" /> Conversas</li>
                            </Link>
                            <li><FaUser className="icon" /> Usuários</li>
                            <li><FaClipboardUser className="icon" /> Leads</li>
                            <li><MdSettings className="icon" /> Configurações</li>
                        </ul>
                    </div >
                </nav >
            </div >
        </>
    )
}