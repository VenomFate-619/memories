import React from "react";
import { useSelector } from "react-redux";
import { Grid, CircularProgress, Paper, Typography } from "@material-ui/core";
import Post from "./Post/Post";
import useStyles from "./styles";

function Posts({ setCurrentId }) {
  let posts = useSelector((state) => state.posts.posts);
  const classes = useStyles();
  // posts = undefined
  if(!posts)
  {
    return <CircularProgress className={classes.circularProgress} />;
  }

  return posts.length===0 ? (
   <Paper>
      <Typography variant="h6" align="center">
        No post made , be the  first to post
      </Typography>
    </Paper>
  ) : (
    <Grid
      className={classes.container}
      container
      alignItems="stretch"
      spacing={3}
    >
      {posts.map((post) => {
        return (
          <Grid key={post._id} item xs={12} sm={4} md={6} >
            <Post post={post}   setCurrentId={setCurrentId } />
          </Grid>
        );
      })}
    </Grid>
  );
}

export default Posts;
