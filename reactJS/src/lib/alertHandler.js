import swal from 'sweetalert';


class AlertHandler {
  success(message , callback) {
  
    swal({
      title: "Good job!",
      text: message,
      icon: "success",
      button: "ok",
    }).then(()=>{
      callback()
    })
  }

  successWithoutCallback(message ) {
  
    swal({
      title: "Good job!",
      text: message,
      icon: "success",
      button: "ok",
    })
  }

  failed(message) {
    swal({
      title: "Error !",
      text: message,
      icon: "error",
      button: "ok",
    });

  }

  delete(id,callback){
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this task!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
       callback(id)
       
      } else {
        swal("Your task is safe!");
      }
    });
  }

 
}

export default new AlertHandler();