import React from "react";
import { Link } from "react-router-dom";
import "react-chat-elements/dist/main.css";
import { MessageList, ChatList, Input } from "react-chat-elements";
import { useEffect, useState } from "react";
import {
	Container,
	Button,
	Form,
	Row,
	Col,
	Card,
	Image,
} from "react-bootstrap";
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
	const [employerId, setEmployerId] = useState("");
	const [chatId, setChatId] = useState("");
	const [newMessage, setNewMessage] = useState("");

	console.log("Messages overview: ", messagesOverview);

	const getMessagesOverview = async () => {
		try {
			const response = await axios.get(
				`${endPointObj.url}/job-seeker/get-messages/${jobSeekerId}`
			);
			console.log(
				"Fetched response for getMessageOverview: ",
				response.data
			);
			const res = response.data.response.messages;

			let dataSource = [];
			for (let i = 0; i < res.length; i++) {
				dataSource.push({
					...res[i],
					avatar: "",
					alt: "Employer",
					title: res[i].employerName,
					subtitle: res[i].lastMessage,
					date: Date.parse(res[i].timestamp),
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
			const response = await axios.get(
				`${endPointObj.url}/employer/get-chats/${e.employerId}/${jobSeekerId}`
			);
			setChats(response.data.response.chats);
			let res = [];
			let chats = response.data.response.chats;
			for (const chat of chats) {
				console.log(chat.timestamp);
				const entry = {
					position:
						chat.sender === localStorage.getItem("role")
							? "right"
							: "left",
					text: chat.text,
					type: "text",
					date: Date.parse(chat.timestamp),
				};

				res.push(entry);
			}

			setChats(res);
			setChatId(e.chatId);
			setEmployerId(e.employerId);
		} catch (err) {
			console.error(err);
		}
	};
	const sendMessage = async () => {
		try {
			const payload = {
				employerId: employerId,
				jobSeekerId: jobSeekerId,
				chatId: chatId,
				message: newMessage,
				sender: "JOB_SEEKER",
			};

			const response = await axios.post(
				`${endPointObj.url}/employer/send-message`,
				payload
			);
			console.log("Response for sendMessage function: ", response);
			getChat({
				employerId: employerId,
				chatId: chatId,
			});
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
							{chat.length ? (
								<>
									<Row style={{ minHeight: "600px" }}>
										<MessageList
											className="message-list"
											lockable={true}
											toBottomHeight={"100%"}
											dataSource={chat}
										/>
									</Row>
									<Row className="border-top mt-1 pt-3">
										<Input
											placeholder="Type your message here .."
											multiline={true}
											onChange={(e) =>
												setNewMessage(e.target.value)
											}
											rightButtons={
												<Button
													variant="success"
													onClick={sendMessage}
												>
													Send
												</Button>
											}
										/>
									</Row>
								</>
							) : (
								<Row style={{ minHeight: "600px" }}>
									<Row>
										<Image
											src="https://uber-eats-prototype.s3.us-west-1.amazonaws.com/Screen%20Shot%202021-11-29%20at%208.23.28%20PM.png"
											style={{
												maxHeight: "200px",
												maxWidth: "400px",
												marginLeft: "250px",
												marginRight: "250px",
												marginTop: "150px",
												marginBottom: "0px",
											}}
										></Image>
										<p
											style={{
												justifyContent: "center",
												marginLeft: "350px",
												marginRight: "250px",
											}}
										>
											<b>You may have messages</b> <br />
											Select a conversation to read
										</p>
									</Row>
									{/* <Row
										style={{
											justifyContent: "center",
											marginTop: "0px",
										}}
									> */}

									{/* </Row> */}
									<Row
										style={{ justifyContent: "center" }}
									></Row>
								</Row>
							)}
						</Container>
					</Col>
				</Row>
			</Container>
		</>
	);
};

export default JobSeekerChats;
