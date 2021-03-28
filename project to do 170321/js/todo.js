"use strict";

let content_inp = document.querySelector("#input");
let todo;
let text_from_inp = "";
let id_number = 0;
let id_parents_number = 0;
let number;
let arr_num;
let TaskObj;






//функция конструктор обьекта Task
function Task(id_number) {
    this.id_number = id_number,
        this.text_from_inp = text_from_inp,
        this.check = false,
        this.l = [],
        this.butt_back = "",
        this.noyset = "",
        this.noylist = "",
        this.text_area = "",
        this.list = "createlist",
        this.alarm = "",
        this.alarm_time = "",
        this.alarm_back = "",
        this.time = "",
        this.parents_number = id_parents_number
}


//функция input() (создание обьекта, помещение его в массив и перезапись localStorage и html)
function complet_obj_in_arr() {

    if (content_inp.value != "") {
        text_from_inp = content_inp.value;
        console.log("text_from_inp=", text_from_inp);
        content_inp.value = "";
        search_free_number();
        id_number = number;
        let worck_arr = [];
        if (id_parents_number == 0) {
            worck_arr = todo;
        } else {
            iter_an_arr(todo);
            arr_num.forEach(function (Task) {
                if (Task.id_number == id_parents_number) {
                    worck_arr = Task.l;
                }
            })
        }
        worck_arr.push(new Task(id_number));
        iter_an_arr(todo);

        arr_num.forEach(function (Task) {
            Task.butt_back = "gs";
            Task.noylist = "gs";
            Task.alarm = "gs";
            if (Task.id_number == id_number) {
                Task.text_from_inp = text_from_inp;
                Task.text_area = "gs";
            }
            if (Task.id_number == id_parents_number) {
                Task.butt_back = "";
            }

            if (Task.parents_number == id_parents_number) {
                Task.butt_back = "gs";
                Task.noylist = "";
            }

            if (Task.parents_number == 0) {
                Task.alarm = "";
            }
        })
        clear_localStorage()
        record_todo_in_storeg();
        insert()
    }
}


//очистка localStorage
function clear_localStorage() {
    localStorage.removeItem(todo);

}

//получение todo из localStorage 
function get_from_localStorage() {
    todo = JSON.parse(localStorage.getItem("todo"));
}

//запись массива todo в localStorage
function record_todo_in_storeg() {
    localStorage.setItem("todo", JSON.stringify(todo));
}

//Итерация массива todo и создание одномерного массива arr_num с объектами Task
function iter_an_arr(arr) {
    arr_num = [];
    f(arr);

}

function f(arr) {
    arr.forEach(function (Task) {
        if (Task.l.length > 0) {
            f(Task.l);
        }
        arr_num.push(Task);
    })
}


//Выбор номера для нумерации нового объкта Task
function search_free_number() {
    iter_an_arr(todo);
    for (let i = 1; i <= arr_num.length + 1; i++) {
        let elem;
        let check = arr_num.every(function (elem) {
            if (elem.id_number == i) {
                return false;
            }
            if (elem.id_number != i) {
                return true;
            }
        });
        if (check) {
            number = i;
            console.log("number=", number);
        }
    }
}




function checkbox(arg) {
    gett_obj_by_id(arg);
    if (TaskObj.check == false) {
        TaskObj.check = true;
        TaskObj.list = "gs";



        iter_an_arr(todo);
        for (let i = 0; i < arr_num.length; i++) {
            if (arr_num[i].id_number == arg) {
                let per_nam = arr_num[i].parents_number;
                console.log("per_nam=", per_nam);
                if (per_nam == 0) {
                    for (let i = 0; i < todo.length; i++) {
                        if (todo[i].id_number == arg) {
                            let check_todo = todo.splice(i, 1)[0];
                            console.log("check_todo=", check_todo);
                            todo.push(check_todo);
                            console.log("todo=", todo);

                        }
                    }
                }
                if (per_nam != 0) {
                    for (let i = 0; i < arr_num.length; i++) {
                        if (arr_num[i].id_number == per_nam) {
                            let arr_work = arr_num[i].l;

                            for (let i = 0; i < arr_work.length; i++) {
                                if (arr_work[i].id_number == arg) {

                                    let check = arr_work.splice(i, 1)[0];
                                    console.log("check=", check);
                                    arr_work.push(check);
                                    console.log("arr_work=", arr_work);
                                }
                            }
                        }
                    }
                }
            }
        }




    } else if (TaskObj.check == true) {
        TaskObj.check = false;
        TaskObj.list = "createlist";
    }
    clear_localStorage()
    record_todo_in_storeg();
    insert();




}




function del(arg) {
    console.log("arg=", arg);
    iter_an_arr(todo);
    for (let i = 0; i < arr_num.length; i++) {
        if (arr_num[i].id_number == arg) {
            let per_nam = arr_num[i].parents_number;
            console.log("per_nam=", per_nam);
            if (per_nam == 0) {
                for (let i = 0; i < todo.length; i++) {
                    if (todo[i].id_number == arg) {
                        todo.splice(i, 1);
                    }
                }
            }
            if (per_nam != 0) {
                for (let i = 0; i < arr_num.length; i++) {
                    if (arr_num[i].id_number == per_nam) {
                        let arr_work = arr_num[i].l;
                        console.log("arr_work=", arr_work);
                        for (let i = 0; i < arr_work.length; i++) {
                            if (arr_work[i].id_number == arg) {
                                arr_work.splice(i, 1);
                            }
                        }
                    }
                }
            }
        }
    }
    clear_localStorage()
    record_todo_in_storeg();
    insert();
}




//nonset() по нажатию на кнопку в текстовом блоке таски скрывает или активирует панель инструментов перезаписывает localStorage и html
function nonset(arg) {
    gett_obj_by_id(arg);
    if (TaskObj.noyset == "") {
        TaskObj.noyset = "gs";
    } else if (TaskObj.noyset == "gs") {
        TaskObj.noyset = "";
    }
    clear_localStorage()
    record_todo_in_storeg();
    insert()

}

//ПЕРЕБОР МАССИВА arr_num АРГУМЕНТ id_number ИСКОМОГО ЭЛЕМЕНТА ВОЗВРАЩАЕТ ЭЛЛЕМЕНТ arr_num - TaskObj

function gett_obj_by_id(arg) {
    iter_an_arr(todo);
    arr_num.forEach(function (Task) {
        if (Task.id_number == arg) {
            TaskObj = Task;
        }
    })
}

////очищает html, перебирает массив вытаскивает из него значения для динамики и передает их в  creatTemplat() которая заполняет  html
function insert() {
    document.querySelector(".remember").innerHTML = "";
    document.querySelector(".gr_back").innerHTML = "";
    iter_an_arr(todo);

    if (arr_num.length > 0) {
        arr_num.forEach((Task) => {

            let txt = Task.text_from_inp;
            let check = Task.check;
            let noyset = Task.noyset;
            let noylist = Task.noylist;
            let butt_back = Task.butt_back;
            let alarm = Task.alarm;
            id_number = Task.id_number;
            let sub_elem = Task.l.length;
            let text_area = Task.text_area;
            let alarm_time = Task.alarm_time;
            let alarm_back = Task.alarm_back;
            
            let sub;
            let list = Task.list;
            if (sub_elem == 0) {
                sub = "gs";

            }

            creatTemplat(txt, check, noyset, id_number, noylist, butt_back, alarm, sub, list, text_area, alarm_time, alarm_back);
        })
    }
}

////creatTemplat() заполняет  html
function creatTemplat(txt, check, noyset, id_number, noylist, butt_back, alarm, sub, list, text_area, alarm_time, alarm_back) {

    let temp = `
<div class="record ${noylist} ${check ? "ch" : ""}" >
                <div  class="settings ${noyset}">
                    <div class="sett">    
                        <button type="button" class="${list}" onclick="list(${id_number})"><span class="but_text">Список</span></button>
                      
                        <label class="check"><span class="but_text">Выполнено</span><input type="checkbox" ${check ? "checked" : ""} class="checked" onclick="checkbox(${id_number})" value="Выполнено"></label>
                        <button type="button" class="del" onclick=del(${id_number})><span class="but_text">Удалить</span></button>
                    </div>
                    <div class="set ${alarm}">
                        <div  class="time">

<button  class="but_time " onclick="tim_date(${id_number}, inp_dat${id_number})"><span class="but_text">Уведомление</span>
                            </button>

                            <input 



class="inp_date " id="inp_dat${id_number}" type="datetime-local" >
                            
                            
                        </div>
                    </div>
                </div>
                <div class="textlist ${alarm_back}">
                  <div class="text_container">

             
                    <button type="button" class="hidden" onclick="nonset(${id_number})"><img 
                    onload="id_adres(${id_number}, inp_dat${id_number})"
                    class="hidd" src="img/dots-three-outline.svg" alt=""></button>

                    <button type="button"  class="hidden" onclick="text_ar_on(${id_number})"><img class="hidd" src="img/feather.svg" alt="">
                    </button>

                    <div class="note_task ${text_area}">
                      <button type="button" class="button_task" onclick=text_ar(${id_number})><img class="hidd" src="img/diskette.png" alt=""></button>
                    </div>
              

                    <div class="subList ${sub}">
                    <span class="subText">
                    Присутствует вложенный список задач
                    </span>
                    </div>
                
                    <div class="hidden hidde ${alarm_time}">
                    </div>


                    </div>
                    <span class="text">${txt}
                    </span>
                </div>
            </div>
</div>

`;
    document.querySelector(".remember").innerHTML += temp;

    let temp2 = `<button type="button" class="back ${butt_back}" onclick=back(${id_number})><img class="kayBack" src="img/arrow-fat-lines-left.svg" alt=""></button>`;
    document.querySelector(".gr_back").innerHTML += temp2;

}







function list(arg) {
    //    console.log("arg=", arg);
    id_parents_number = arg;
    //    console.log("id_parents_number=", id_parents_number)
    iter_an_arr(todo);
    arr_num.forEach(function (Task) {
        Task.noylist = "gs";
        Task.butt_back = "gs";
    })
    arr_num.forEach(function (Task) {
        if (Task.id_number == arg) {
            //                Task.noylist = "";
            Task.butt_back = "";
        }
        if (Task.parents_number == arg) {
            Task.noylist = "";
        }
    })
    record_todo_in_storeg();
    insert();
};




function back(arg) {
    let per_nam;
    iter_an_arr(todo);
    for (let i = 0; i < arr_num.length; i++) {
        arr_num[i].butt_back = "gs";
        arr_num[i].noylist = "gs";
    }
    for (let i = 0; i < arr_num.length; i++) {
        if (arr_num[i].id_number == arg) {
            per_nam = arr_num[i].parents_number;
        }

    }
    for (let i = 0; i < arr_num.length; i++) {
        if (arr_num[i].parents_number == per_nam) {
            arr_num[i].butt_back = "gs";
            arr_num[i].noylist = "";
        }

    }



    for (let i = 0; i < arr_num.length; i++) {
        if (arr_num[i].id_number == per_nam) {
            arr_num[i].butt_back = "";
            //            arr_num[i].noylist = "gs";
        }

    }




    clear_localStorage();
    record_todo_in_storeg();
    insert();
}



function home() {
    if (JSON.parse(localStorage.getItem("todo"))) {
        get_from_localStorage()
        insert(id_number);
    } else {
        todo = [];
        record_todo_in_storeg();

    }

    iter_an_arr(todo);
    arr_num.forEach(function (Task) {
        Task.butt_back = "gs";
        Task.noylist = "gs";
    })

    iter_an_arr(todo);
    for (let i = 0; i < arr_num.length; i++) {
        if (arr_num[i].parents_number == 0) {
            arr_num[i].noylist = "";
        }
    }
    clear_localStorage();
    record_todo_in_storeg();
    insert();

}

home();

//привязка кнопок добавить и интер к вызову функции input() (создание обьекта, помещение его в массив и перезапись localStorage и html)
document.querySelector(".button").onclick = complet_obj_in_arr;
addEventListener("keydown", function (event) {
    console.log("event=", event)
    if (event.keyCode == 13) {
        selection();
    }
})


function selection() {
    let id_n;
    let check = arr_num.every(function (elem) {
        if (elem.text_area == "") {
            return false;
        }
        if (elem.text_area == "gs") {
            return true;
        }
    });
    iter_an_arr(todo);
    if (Task.text_area == "") {
        id_n = Task.id_number;
    }
    if (check) {
        complet_obj_in_arr();
    }
    if (!check) {
        text_ar(id_n);
    }
}

function text_ar(arg) {
    console.log("arg=", arg);
    let txt_ar = input.value;
    console.log("input_task.value=", input.value);
    console.log("txt_ar=", txt_ar);
    gett_obj_by_id(arg);
    TaskObj.text_from_inp = txt_ar;
    TaskObj.text_area = "gs";
    input.value = "";
    clear_localStorage();
    record_todo_in_storeg();
    insert();
}


function text_ar_on(arg) {
    //    let txt_ar = input.value;

    gett_obj_by_id(arg);
    console.log("TaskObj.text_from_inp=", TaskObj.text_from_inp);
    document.querySelector("#input").value = TaskObj.text_from_inp;
    console.log("TaskObj.text_from_inpe=", TaskObj.text_from_inp);
    TaskObj.text_area = "";
    clear_localStorage();
    record_todo_in_storeg();
    insert();
}

function tim_date(arg, dat) {

    let t = dat.value;
    let alarm_time = new Date(t);
    let present_time = new Date();
    console.log("alarm_time=", alarm_time);
    console.log("present_time=", present_time);
    console.log("dat=", dat);
    console.log("t=", t);
    gett_obj_by_id(arg)
    TaskObj.time = t;



    clear_localStorage();
    record_todo_in_storeg();

    setInterval(function () {
        if (present_time >= alarm_time) {
            gett_obj_by_id(arg);
            TaskObj.alarm_time = "time_blink";
            TaskObj.alarm_back = "pink";
            clear_localStorage();
            record_todo_in_storeg();
            insert();
        }

                if (present_time <= alarm_time) {
                TaskObj.alarm_time = "";
                 clear_localStorage();
            record_todo_in_storeg();
            insert();
            }

    }, 10000);

}


function id_adres(arg, dat) {
    gett_obj_by_id(arg)
    dat.value = TaskObj.time;
}
