const router = require("express").Router();
const blogController = require("../controllers/blogControllers");
const { requireAuth, checkUser } = require("../middlewares/authMiddleware");

router.get("/", checkUser, blogController.getAllBlogs);
router.post("/", checkUser, blogController.createBlog);
router.get("/create", requireAuth, checkUser, blogController.createPage);
router.delete("/:id", checkUser, blogController.deleteBlog);
router.get("/:id", checkUser, blogController.getOneBlog);

module.exports = router;
