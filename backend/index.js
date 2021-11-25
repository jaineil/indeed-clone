import mongoInit from "./src/db/config/mongo.init.js";
import app from "./app.js";
//import testRouter from "./src/modules/test/router/test.js";
//import kafkaTestRouter from "./src/modules/kafka-test/router/kafkaTestRouter.js";
import companyRouter from "./src/modules/company/router/companies.js";
import reviewRouter from "./src/modules/review/router/reviews.js";
import chatsRouter from "./src/modules/chat/router/chats.js";
import userRouter from "./src/modules/user/router/users.js"

mongoInit();

//app.use(testRouter);
//app.use(kafkaTestRouter);
app.use(companyRouter);
app.use(reviewRouter);
app.use(chatsRouter);
app.use(userRouter);
