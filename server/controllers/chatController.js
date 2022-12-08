const asyncHandler = require("express-async-handler");
const Chat = require("../models/Chat");
const User = require("../models/User");

// ==========================================================
// ==========================================================
// Chat Access Functionality
// ==========================================================
// ==========================================================
const accessChat = asyncHandler(async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    console.log("User ID not found");
    return res.sendStatus(400);
  }

  let isChat = await Chat.find({
    isGroupChat: false,
    $and: [
      {
        users: { $elementMatch: { $eq: req.user._id } },
      },
      {
        users: { $elementMatch: { $eq: userId } },
      },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");

  isChat = await User.populate(isChat, {
    path: "latestMessage.sender",
    select: "name email",
  });

  // If the chat exists, the router will send the chat
  if (isChat.length > 0) {
    res.send(isChat[0]);
  } else {
    // Otherwise, a new chat between two users is created
    let chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [req.user._id],
    };

    try {
      const createdChat = await Chat.create(chatData);

      const newChat = await Chat.findOne({ _id: createdChat._id }).populate(
        "users",
        "-password"
      );
      res.status(200).send(newChat);
    } catch (err) {
      res.status(400);
      throw new err(err.message);
    }
  }
});

// ==========================================================
// ==========================================================
// Get All Chats Functionality
// ==========================================================
// ==========================================================
const allChats = asyncHandler(async (req, res) => {
  try {
    Chat.find({ users: { $elementMatch: { $eq: req.user._id } } })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 })
      .then(async (results) => {
        results = await User.populate(results, {
          path: "latestMessage",
          select: "name email",
        });
        res.status(200).send(results);
      });
  } catch (err) {
    res.status(400);
    throw new err(err.message);
  }
});

// ==========================================================
// ==========================================================
// Create Group Chat Functionality
// ==========================================================
// ==========================================================
const createGroupChat = asyncHandler(async (req, res) => {
  if (!req.body.users || !req.body.name) {
    return res.status(400).send({ message: "Please fill out all fields" });
  }
  // Stringify data from the front end to the back end
  let users = JSON.parse(req.body.users);

  if (users.length < 2) {
    return res.status(400).send("At least 3 users are required");
  }
  users.push(req.user);

  try {
    const createGroup = await Chat.create({
      chatName: req.body.name,
      users: users,
      isGroupChat: true,
      groupAdmin: req.user,
    });

    const groupChat = await Chat.findOne({ _id: createGroup._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    res.status(200).json(groupChat);
  } catch (err) {
    res.status(400);
    throw new err(err.message);
  }
});

// ==========================================================
// ==========================================================
// Add To Group Chat Functionality
// ==========================================================
// ==========================================================
const addToGroup = asyncHandler(async (req, res) => {
  const { chatId, userId } = req.body;

  const added = await Chat.findByIdAndUpdate(
    chatId,
    {
      $push: { users: userId },
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!added) {
    res.status(404);
    throw new err("No chat found");
  } else {
    res.json(added);
  }
});

// ==========================================================
// ==========================================================
// Remove From Group Chat Functionality
// ==========================================================
// ==========================================================
const removeFromGroup = asyncHandler(async (req, res) => {
  const { chatId, userId } = req.body;

  const removed = await Chat.findByIdAndUpdate(
    chatId,
    {
      $pull: { users: userId },
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!added) {
    res.status(404);
    throw new err("No chat found");
  } else {
    res.json(removed);
  }
});

module.exports = {
  accessChat,
  allChats,
  createGroupChat,
  addToGroup,
  removeFromGroup,
};
