import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import FileBase from "react-file-base64";
import { Notify } from "notiflix";
import { useDispatch, useSelector } from "react-redux";
import useStyles from "./styles";
import { createPost, updatePost } from "../../actions/post";

function Form({ currentId, setCurrentId }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [postData, setPostData] = useState({
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });
  const [status, setStatus] = useState(false);
  const post = useSelector((state) =>
    currentId ? state.posts.posts.find((post) => post._id === currentId) : null
  );
  var loading = useSelector((state) => state.posts.loading);

  var user = JSON.parse(localStorage.getItem('profile'))
  
  useEffect(() => {
    console.log("running form");
    if (post) setPostData(post);
  }, [post]);

  var handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (postData.selectedFile.length > 0) {
        if (currentId) {
          dispatch(updatePost(currentId, postData));
          setCurrentId(null);
        } else {
          dispatch(createPost({...postData , userName:user?.result?.name}));
          window.scrollTo({ bottom: 0, behavior: "smooth" });
        }
        clear();
        setStatus(false);
      } else {
        setStatus(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  var addValue = (e) => {
    setPostData({ ...postData, [e.target.name]: e.target.value });
  };
  var clear = () => {
    setPostData({
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
    setCurrentId(null);
  };
  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper}>
        <Typography variant="h6" align="justify">
          Please Sign In to create your own memories and like other's memories.
        </Typography>
      </Paper>
    );
  }
  return (
    <Paper className={classes.paper} id="main">
      <form
        autoComplete="off"
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">
          {" "}
          {currentId ? `Editing ${post.title}` : "Creating a Memory"}{" "}
        </Typography>
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={postData.title}
          onChange={(e) => addValue(e)}
          required
        />
        <TextField
          name="message"
          variant="outlined"
          label="Message"
          fullWidth
          multiline
          row={4}
          value={postData.message}
          onChange={(e) => addValue(e)}
          required
        />
        <TextField
          name="tags"
          variant="outlined"
          label="Tags (coma separated)"
          fullWidth
          value={postData.tags}
          onChange={(e) =>
            setPostData({ ...postData, tags: e.target.value.split(",") })
          }
          required
        />
        <div className={classes.fileInput}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
            required
          />
          {status && <p>Plz 🙏 include a image</p>}
        </div>
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
          disabled={loading}
        >
          Submit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={clear}
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
}

export default Form;
