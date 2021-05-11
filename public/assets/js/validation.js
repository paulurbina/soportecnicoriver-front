const toastPersonalized = (data, icon = 'error') => {
    $.toast({
        text: data.text,
        hideAfter: 6000,
        showHideTransition: 'slide',
        stack: false,
        icon
    });
}
const notification = (data) => !data.success ? toastPersonalized(data, 'error') : toastPersonalized(data, 'success')

const buttonFormLoader = (html, id) => {
    $(id).html(html)
}

$('#productoForm').validate({
    rules: {
        name: {
            required: true,
            minlength: 4
        },
        email: {
            required: true,
            email: true
        },
        phone: {
            required: true,
            minlength: 9
        },
        message: {
            required: false,
            minlength: 4
        },
    },
    messages: {
        name: {
            required: 'Nombre es requerido!',
            minlength: 'Minimo 4 caracteres!'
        },
        email: {
            required: 'Email es requerido!',
        },
        phone: {
            required: 'Numero es requerido!',
            minlength: 'Minimo 9 dígitos!'
        },
        message: {
            minlength: 'Minimo 4 caracteres!'
        }
    },
    submitHandler: function sendDate() {
        const form = $("#productoForm");
        const form_data = form.serialize();

        buttonFormLoader('<i class="fa fa-spinner fa-spin"></i>', '#submit')

        $.ajax({
            url: 'https://serviciotecnicoriver.herokuapp.com/new-user',
            method: 'POST',
            data: form_data,
        }).done(response => {
            form[0].reset();
            //send notificacitions
            notification(response)

            //disabled button form, load web enabled
            $('#submit').attr('disabled', true)
            buttonFormLoader('Enviar', '#submit')

        }).fail(error => {
            form[0].reset();
            const errorJSON = error.responseJSON
            if (errorJSON) {
                notification(errorJSON)
            }
        })
    }
});
$('#form-footer').validate({
    rules: {
        subscriber: {
            required: true,
            email: true
        }
    },
    messages: {
        subscriber: {
            required: 'Ingrese un email valido'
        }
    },
    submitHandler: function sendSubscriber() {
        const form = $('#form-footer');
        const form_data = form.serialize();

        buttonFormLoader('<i class="fa fa-spinner fa-spin"></i>', '#submitSubs')

        $.ajax({
            url: 'https://serviciotecnicoriver.herokuapp.com/subscriber',
            method: 'POST',
            data: form_data,
        }).done(response => {
            form[0].reset();

            //send notificacitions
            notification(response)

            //disabled button form, load web enabled
            $('#submitSubs').attr('disabled', true)
            buttonFormLoader('<i class="fa fa-paper-plane fa-lg"></i>', '#submitSubs')

        }).fail(error => {
            form[0].reset();
            const errorJSON = error.responseJSON
            if (errorJSON) {
                notification(errorJSON)
            }
        })

    }
})