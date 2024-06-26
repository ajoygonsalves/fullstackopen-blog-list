const _ = require("lodash");
const User = require("../models/user");

const dummy = (blogs) => {
  return 1;
};

const blogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0,
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0,
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0,
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0,
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0,
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0,
  },
];

const zero = [
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0,
  },
];

const mostBlogs = (blogs) => {
  return _.chain(blogs)
    .countBy("author") // Count the number of blogs for each author
    .map((blogs, author) => ({ author, blogs })) // Convert the result to an array of objects
    .maxBy("blogs") // Find the author with the most blogs
    .value(); // Get the final result
};

const mostLikes = (blogs) => {
  if (blogs.length < 1) return 0;
  return _.chain(blogs).maxBy("likes").pick(["author", "likes"]).value();
};

const totalLikes = (blogs) => {
  if (blogs.length < 1) return 0;
  return blogs.reduce((acc, curr) => {
    return acc + curr.likes;
  }, 0);
};

const mostLiked = (blogs) => {
  if (blogs.length < 1) return 0;

  const mostLikedItem = blogs.reduce((acc, curr) => {
    if (acc.likes === curr.likes) return { ...acc };
    return acc.likes > curr.likes ? { ...acc } : { ...curr };
  });

  return mostLikedItem;
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((u) => u.toJSON());
};

module.exports = {
  dummy,
  totalLikes,
  mostLiked,
  mostBlogs,
  mostLikes,
  usersInDb,
};

// Define a new totalLikes function that receives a list of blog posts as a parameter. The function returns the total sum of likes in all of the blog posts.
