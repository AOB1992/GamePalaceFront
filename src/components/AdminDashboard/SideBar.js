import React, { useState } from "react";
import "./SideBar.css";
import {TbHome2,TbUsers,TbClipboardText,TbFileAnalytics ,TbTags,TbTools } from "react-icons/tb";
import {RiQuestionnaireLine} from "react-icons/ri";


const SideBar = () => {
	const [isExpanded, setExpendState] = useState(true);
	const menuItems = [
		{
			text: "Dashboard",
			icon: "icons/grid.svg",
            href: "/admin-dashboard"
		},
		{
			text: "Users Manage",
			icon: "icons/user.svg",
            href: "/admin-users"
		},
		// {
		// 	text: "Sales History",
		// 	icon: "icons/message.svg",
        //     href: "/admin-sales"
		// },
		
		{
			
			text: "Products",
			icon: "icons/folder.svg",
            href: "/admin-products"
		},
		{
			text: "New Product",
			icon: "icons/folder.svg",
            href: "/admin-products-form"
		},
		
	
	];
	return (
		<div
			className={
				isExpanded
					? "side-nav-container"
					: "side-nav-container side-nav-container-NX"
			}
		>
			<div className="nav-upper">
				<div className="nav-heading">
					{isExpanded && (
						<div className="nav-brand">
							<img src="icons/Logo.svg" alt="" srcset="" />
							<h2>admin</h2>
						</div>
					)}
					<button
						className={
							isExpanded ? "hamburger hamburger-in" : "hamburger hamburger-out"
						}
						onClick={() => setExpendState(!isExpanded)}
					>
						<span></span>
						<span></span>
						<span></span>
					</button>
				</div>

				
				<div className="nav-menu">
				<TbHome2 className="home"/>	<TbUsers className="users"/>	<TbClipboardText className="sales"/>	<TbTools className="create"/>
					{menuItems.map(({ text, icon, href }) => (
						<a
							className={isExpanded ? "menu-item" : "menu-item menu-item-NX"}
							href={href}
						>
							<img className="menu-item-icon" src={icon} alt="" srcset="" />
							{isExpanded && <p>{text}</p>}
						</a>
					))}
				</div>
			</div>
			<div className="nav-footer">
				{isExpanded && (
					<div className="nav-details">
						<img
							className="nav-footer-avatar"
							src="icons/admin-avatar.svg"
							alt=""
							srcset=""
						/>
						<div className="nav-footer-info">
							<p className="nav-footer-user-name">Dashboard</p>
							<p className="nav-footer-user-position">Gaming Palace</p>
						</div>
					</div>
				)}
				<img className="logout-icon" src="icons/logout.svg" alt="" srcset="" />
			</div>

			
		</div>
	);
};

export default SideBar;
