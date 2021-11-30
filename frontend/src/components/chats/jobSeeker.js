import React from "react";
import { Link } from "react-router-dom";
import "react-chat-elements/dist/main.css";
import { MessageList, ChatList } from "react-chat-elements";
import { useEffect, useState } from "react";
import { Container, Button, Form, Row, Col, Card } from "react-bootstrap";
import Header from "../common/Header";
import endPointObj from "../../endPointUrl";
import axios from "axios";

const JobSeekerChats = () => {
	const [activeChat, setActiveChat] = useState("");
	const [jobSeekerId, setJobSeekerId] = useState(
		localStorage.getItem("userId")
	);
	const [messagesOverview, setMessagesOverview] = useState();
	const [chat, setChats] = useState([]);

	console.log("Messages overview: ", messagesOverview);

	const getMessagesOverview = async () => {
		try {
			// const response = await axios.get(
			// 	`http://${endPointObj.url}/job-seeker/get-messages/${jobSeekerId}`
			// );
			// console.log(
			// 	"Fetched response for getMessageOverview: ",
			// 	response.data
			// );
			// const res = response.data.messages;
			const res = [
				{
					employerId: "4",
					employerName: "John Doe",
					lastMessage: "Regarding your interview at Amazon",
					timestamp: "",
				},
				{
					employerId: "4",
					employerName: "Patricia Smith",
					lastMessage: "Congratulations! You have received an offer",
					timestamp: "",
				},
				{
					employerId: "4",
					employerName: "John Doe",
					lastMessage: "Regarding your interview at Amazon",
					timestamp: "",
				},
				{
					employerId: "4",
					employerName: "John Doe",
					lastMessage: "Regarding your interview at Amazon",
					timestamp: "",
				},
				{
					employerId: "4",
					employerName: "John Doe",
					lastMessage: "Regarding your interview at Amazon",
					timestamp: "",
				},
				{
					employerId: "4",
					employerName: "John Doe",
					lastMessage: "Regarding your interview at Amazon",
					timestamp: "",
				},
			];
			let dataSource = [];
			for (let i = 0; i < res.length; i++) {
				dataSource.push({
					...res[i],
					avatar: "",
					alt: "Employer",
					title: res[i].employerName,
					subtitle: res[i].lastMessage,
					date: new Date(),
					unread: 0,
				});
			}
			setMessagesOverview(dataSource);
		} catch (err) {
			console.error(err);
		}
	};
	const getChat = async (e) => {
		try {
			// const response = await axios.get(
			// 	`http://${endPointObj.url}/employer/get-chats/${e.employerId}/${jobSeekerId}`
			// );
			// console.log("Response of getChat function: ", response.data);
			// setChats(response.data.chats);
			// const res = response.data.chats
			const res = [
				//dummy data
			];
		} catch (err) {
			console.error(err);
		}
	};
	useEffect(() => {
		console.log("Rendering");
		getMessagesOverview();
	}, []);
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
								onClick={(e) => getChat(e)}
								dataSource={messagesOverview}
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
								dataSource={chat}
							/>
						</Container>
					</Col>
				</Row>
			</Container>
		</>
	);
};

export default JobSeekerChats;
