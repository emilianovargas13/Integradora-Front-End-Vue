import Swal from 'sweetalert2';
import './styles.css';
import { SweetAlertIcon } from 'sweetalert2';

const toast = (icon: SweetAlertIcon, title: string, text: string) => {
    Swal.mixin({
        toast: true,
        position: 'top-end',
        iconColor: 'white',
        customClass: {
            popup: 'colored-toast'
        },
        showConfirmButton: false,
        showCancelButton: false,
        timer: 5000,
        timerProgressBar: true
    }).fire({
        icon: icon,
        title: title,
        text: text     
    })
}

const showSuccessToast = (title: string, text?: string) => {
    toast('success', title, text ? text : '');
}

const showErrorToast = (title: string, text?: string) => {
    toast('error', title, text ? text : '');
}

const showSuccessTimer = (title: string, html: string) => {
    Swal.fire({
        icon: 'success',
        customClass: {
            popup: 'timer-popup',
        },
        title: '<h4>' + title + '</h4>',
        html: html,
        timer: 10000,
        timerProgressBar: true,
        allowOutsideClick: false,
        showConfirmButton: false
    })
}

export {
    showSuccessToast,
    showErrorToast,
    showSuccessTimer
}