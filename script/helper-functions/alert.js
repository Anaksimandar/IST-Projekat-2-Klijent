// export function showAlert(element:JQuery, message:string = '') {
//     const isHidden:boolean = element.is(":hidden");
//     if(isHidden){
//         element.attr("hidden",false).text(message);
//         setTimeout(()=>{
//             element.attr("hidden",true);
//         },3000)
//     }
//     else{
//         element.attr("hidden", true);
//     }
// }
// Alert ce imati dva stanja, sa animacijom i bez. Forma = active alert | API response - 3s alert
export function toggleAlert(show, element, message = '', animation = false) {
    show ? element.attr("hidden", false).text(message) : element.attr("hidden", true);
    if (animation) {
        setTimeout(() => element.attr("hidden", true), 3000);
    }
}
export function changeClass(element, className, message, animation = false) {
    element.attr("hidden", false)
        .removeClass('alert-success alert-danger')
        .addClass(className)
        .text(message);
    if (animation) {
        setTimeout(() => {
            element.attr("hidden", true);
        }, 3000);
    }
}
