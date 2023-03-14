$(() => {
    var getLocalStorage = () => JSON.parse(localStorage.getItem("dbFunc")) ?? []
    var setLocalStorage = (dbFunc) => localStorage.setItem("dbFunc", JSON.stringify(dbFunc))

    updateTable()

    $("#btnSalvar").click(() => {
        saveFunc()
    })

    $("table tbody tr").click(function (e) {
        if (e.target.type == 'button') {
            var [action, id] = e.target.id.split('-')

            if (action == "btnEdit") {
                editFunc(id)
            } else {
                var func = getLocalStorage()[id]
                var response = confirm(`Deseja realmente excluir o funcionario ${func.nome}`)
                if (response) {
                    deleteFunc(id)
                    // updateTable()
                }

            }
        }
    })

    //crud
    function createFunc(func) {
        var dbFunc = getLocalStorage()
        dbFunc.push(func)
        setLocalStorage(dbFunc)
    }

    function updateFunc(id, func) {
        var dbFunc = getLocalStorage()
        dbFunc[id] = func
        setLocalStorage(dbFunc)
    }

    function deleteFunc(id) {
        var dbFunc = getLocalStorage()
        dbFunc.splice(id, 1)
        setLocalStorage(dbFunc)
    }

    //
    function saveFunc() {
        var nome = $("#nome").val()
        var funcao = $("#funcao").val()
        var salario = $("#salario").val()

        var dadosFunc = {
            nome: nome,
            funcao: funcao,
            salario: salario
        }
        createFunc(dadosFunc)
        updateFunc()

        // if (isValidFields()) {
        //     console.log("ok");
        // }
    }

    function createRow(func, id) {
        $('#tableFun tbody').append(`
        <tr>
            <th>${func.nome}</th>
            <th>${func.funcao}</th>
            <th>${func.salario}</th>
            <th class="d-flex justify-content-end">
            <div class="btn-group">
                <button type="button" id="btnDel-${id}" class="btn btn btn-danger">Excluir</button>
            </div>
            </th>
        </tr>`)
    }

    function updateTable() {
        var dbFunc = getLocalStorage()
        clearTable()
        dbFunc.forEach(createRow)
    }

    function clearTable() {
        var rows = document.querySelectorAll('#tableFunc> tbody tr')
        rows.forEach(row => row.parent().empty(row))
    }

    // function editFunc(id) {
    //     var func = getLocalStorage()[id]
    //     console.log(func);

    //     $("#nome").value = func.nome
    //     console.log($("#nome").value = func.nome);

    //     $('#cadastroModal').modal()
    // }
})