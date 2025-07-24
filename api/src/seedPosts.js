import "dotenv/config";
import mongoose from "mongoose";
import Post from "./models/post.model.js"; // Adjust this path as needed

// Connect to MongoDB Atlas
const MONGODB_URI = process.env.MONGO_URI || "";

if (!MONGODB_URI) {
  console.error(
    "❌ MONGODB_URI environment variable not set. Please set it in your environment or .env file."
  );
  process.exit(1);
}

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// User IDs you provided
const userIds = [
  "68822bd5cf496d2b6d116ba5", // asad@gmail.com
  "68822be8cf496d2b6d116ba8", // asadullahimran19@gmail.com
  "68828b0ddb5a31c579f242dc", // redowan tanvir shifat
];

// Tag pool
const tagsPool = [
  "Travel",
  "Food",
  "Tech",
  "Fitness",
  "Lifestyle",
  "Fashion",
  "Music",
  "Productivity",
];

const postTemplates = [
  {
    title: "Exploring the Beauty of Bandarban",
    content:
      "I recently took a trip to Bandarban and was blown away by the natural beauty, waterfalls, and hill views. A perfect getaway to reconnect with nature.",
    tag: "Travel",
    image: "https://source.unsplash.com/random/800x600/?mountains,travel",
  },
  {
    title: "My Favorite Homemade Pasta Recipe",
    content:
      "Here's how I make creamy garlic pasta from scratch. Super easy, delicious, and perfect for a quick dinner night!",
    tag: "Food",
    image: "https://source.unsplash.com/random/800x600/?pasta,food",
  },
  {
    title: "Top 5 VS Code Extensions for Web Developers",
    content:
      "These extensions save me hours every week. From code formatting to Git integration, here’s my essential setup.",
    tag: "Tech",
    image: "https://source.unsplash.com/random/800x600/?code,developer",
  },
  {
    title: "Simple Workout Routine for Busy People",
    content:
      "No time for the gym? Here’s a daily 20-minute bodyweight workout you can do at home to stay in shape.",
    tag: "Fitness",
    image: "https://source.unsplash.com/random/800x600/?fitness,workout",
  },
  {
    title: "A Day in My Minimalist Routine",
    content:
      "From decluttering my digital space to living with fewer distractions, here's how minimalism is helping my mental health.",
    tag: "Lifestyle",
    image: "https://source.unsplash.com/random/800x600/?minimalist,lifestyle",
  },
  {
    title: "Monsoon Fashion Trends in 2025",
    content:
      "Light fabrics, pastel colors, and waterproof accessories are dominating this monsoon season. Here's my personal styling guide.",
    tag: "Fashion",
    image: "https://source.unsplash.com/random/800x600/?fashion,style",
  },
  {
    title: "How Lo-Fi Beats Help Me Focus",
    content:
      "Whether studying or coding, lo-fi music keeps me in the zone. Here are my favorite playlists and why they work.",
    tag: "Music",
    image: "https://source.unsplash.com/random/800x600/?music,lofi",
  },
  {
    title: "Boost Your Productivity with the Pomodoro Technique",
    content:
      "I tried Pomodoro for 7 days and my focus skyrocketed. Here’s how it works and tips to make it even better.",
    tag: "Productivity",
    image: "https://source.unsplash.com/random/800x600/?productivity,work",
  },
];

function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

async function seedPosts() {
  try {
    const posts = [];

    for (let i = 0; i < 20; i++) {
      const template = getRandomItem(postTemplates);

      const post = {
        title: template.title,
        content: template.content,
        author: getRandomItem(userIds),
        image: `${template.image}&sig=${i}`, // force different image
        tags: [template.tag],
        comments: [],
        reactions: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      posts.push(post);
    }

    await Post.insertMany(posts);
    console.log("✅ 20 meaningful dummy posts inserted successfully!");
    mongoose.disconnect();
  } catch (error) {
    console.error("❌ Error inserting dummy posts:", error);
    mongoose.disconnect();
  }
}

seedPosts();
