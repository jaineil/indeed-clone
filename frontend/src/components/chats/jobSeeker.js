import React from "react";
import { Link } from "react-router-dom";
import "react-chat-elements/dist/main.css";
import { MessageList, ChatList } from "react-chat-elements";
import { useEffect, useState } from "react";
import { Container, Button, Form, Row, Col, Card } from "react-bootstrap";
import Header from "../common/Header";

const JobSeekerChats = () => {
	const [activeChat, setActiveChat] = useState("");
	return (
		<>
			<Header />
			<Container
				fluid
				style={{ backgroundColor: "#f6f6f6" }}
				className="px-5"
			>
				<Row>
					<Col xs={4} className="p-3">
						<Container
							className="h-100 d-inline-block"
							style={{ backgroundColor: "white" }}
						>
							<ChatList
								className="chat-list"
								dataSource={[
									{
										avatar: "https://facebook.github.io/react/img/logo.svg",
										alt: "Reactjs",
										title: "Facebook",
										subtitle: "What are you doing?",
										date: new Date(),
										unread: 0,
									},
									{
										avatar: "https://facebook.github.io/react/img/logo.svg",
										alt: "Reactjs",
										title: "Facebook",
										subtitle: "What are you doing?",
										date: new Date(),
										unread: 0,
									},
									{
										avatar: "https://facebook.github.io/react/img/logo.svg",
										alt: "Reactjs",
										title: "Facebook",
										subtitle: "What are you doing?",
										date: new Date(),
										unread: 0,
									},
									{
										avatar: "https://facebook.github.io/react/img/logo.svg",
										alt: "Reactjs",
										title: "Facebook",
										subtitle: "What are you doing?",
										date: new Date(),
										unread: 0,
									},
									{
										avatar: "https://facebook.github.io/react/img/logo.svg",
										alt: "Reactjs",
										title: "Facebook",
										subtitle: "What are you doing?",
										date: new Date(),
										unread: 0,
									},
									{
										avatar: "https://facebook.github.io/react/img/logo.svg",
										alt: "Reactjs",
										title: "Facebook",
										subtitle: "What are you doing?",
										date: new Date(),
										unread: 0,
									},
								]}
							/>
						</Container>
					</Col>
					<Col xs={8} className="p-3">
						<Container
							className="h-100 d-inline-block py-5"
							style={{ backgroundColor: "white" }}
						>
							<MessageList
								className="message-list"
								lockable={true}
								toBottomHeight={"100%"}
								dataSource={[
									{
										position: "left",
										type: "text",
										text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit",
										date: new Date(),
									},
									{
										position: "right",
										type: "text",
										text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit",
										date: new Date(),
									},
									{
										position: "left",
										type: "text",
										text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit",
										date: new Date(),
									},
									{
										position: "right",
										type: "text",
										text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit",
										date: new Date(),
									},
									{
										position: "left",
										type: "text",
										text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit",
										date: new Date(),
									},
								]}
							/>
						</Container>
					</Col>
				</Row>
			</Container>
		</>
	);
};

export default JobSeekerChats;
