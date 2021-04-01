import {  Notify } from 'notiflix'


function showError(){
    console.log('whyyyyyyyyyyyy');
    Notify.Failure('server errors');
}

export default showError