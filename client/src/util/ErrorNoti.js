import {  Notify } from 'notiflix'


function showError(){
    Notify.Failure('server errors');
}

export default showError