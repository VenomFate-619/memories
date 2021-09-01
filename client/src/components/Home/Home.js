import React,{useState,useEffect} from 'react'
import { Container,  Grow, Grid } from "@material-ui/core";
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import { useDispatch } from 'react-redux';
import {getPosts } from '../../actions/post' ;
import useStyles from '../../styles';


function Home() {
    const [currentId, setCurrentId] = useState(null)
    const classes=useStyles()
    const dispatch = useDispatch()
  
    useEffect(() => {
      dispatch(getPosts())
      console.log("running home");
    }, [currentId,dispatch])

    return (
      <Grow in>
        <Container>
          <Grid
            container
            justify="space-between"
            alignItems="stretch"
            spacing={3}
            className={classes.mainContainer}
          >
            <Grid item xs={12} sm={7} className={classes.setMaxWidth} item >
              <Posts setCurrentId={setCurrentId} />
            </Grid>
            <Grid item xs={12} sm={5} className={classes.form} >
              <Form  currentId={currentId} setCurrentId={setCurrentId} />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    );
}

export default Home
