import React, { useEffect } from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@material-ui/core/";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbUpAltOutlined from "@material-ui/icons/ThumbUpAltOutlined";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import moment from "moment";
import { useDispatch } from "react-redux";
import { deletePost, likePost, changeLike } from "../../../actions/post";
import useStyles from "./styles";

function Post({ post, setCurrentId }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));

  let isLikeByMe = post?.likeUser.includes(user?.result?._id ?? "");
  let isCreatedByMe = user?.result?._id === post.creator;

  const Likes = () => {
    const likeNumber = post.likeNumber;
    if (likeNumber > 0) {
      return isLikeByMe ? (
        <>
          <ThumbUpAltIcon fontSize="small" />
          &nbsp;
          {likeNumber > 2
            ? `You and ${likeNumber - 1} others`
            : `${likeNumber} like${likeNumber > 1 ? "s" : ""}`}
        </>
      ) : (
        <>
          <ThumbUpAltOutlined fontSize="small" />
          &nbsp;{likeNumber} {likeNumber === 1 ? "Like" : "Likes"}
        </>
      );
    }

    return (
      <>
        <ThumbUpAltOutlined fontSize="small" />
        &nbsp;Like
      </>
    );
  };

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        image={post.selectedFile}
        title={post.title}
      />
      <div className={classes.overlay}>
        <Typography variant="h6">{post.userName}</Typography>
        <Typography variant="body2">
          {moment(post.createdAt).fromNow()}
        </Typography>
      </div>
      <div className={classes.overlay2}>
        {isCreatedByMe && (
          <Button
            style={{ color: "white", minWidth: 0 }}
            size="small"
            onClick={() => {
              setCurrentId(post._id);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <MoreHorizIcon fontSize="default" />
          </Button>
        )}
      </div>
      <div className={classes.details}>
        <Typography variant="body2" color="textSecondary" component="h2">
          {post.tags.map((tag) => `#${tag} `)}
        </Typography>
      </div>
      <Typography
        className={classes.title}
        gutterBottom
        variant="h5"
        component="h2"
      >
        {post.title}
      </Typography>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {post.message}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button
          size="small"
          color="primary"
          disabled={!user?.result}
          onClick={() => dispatch(changeLike(post._id, isLikeByMe))}
        >
          <Likes />
        </Button>
        {isCreatedByMe && (
          <Button
            size="small"
            color="primary"
            disabled={!user?.result}
            onClick={() => dispatch(deletePost(post._id))}
            style={{ minWidth: 0 }}
          >
            <DeleteIcon fontSize="small" />
          </Button>
        )}
      </CardActions>
    </Card>
  );
}

export default Post;
