var getLocalStorage = () => JSON.parse(localStorage.getItem('db_client')) ?? []
var setLocalStorage = (dbClient) => localStorage.setItem('db_client', JSON.stringify(dbClient))

function createCLi(client) {
    var dbClient = getLocalStorage()
    dbClient.push(client)
    setLocalStorage(dbClient)

}

function deleteCli(index) {
    var dbClient = getLocalStorage()
    dbClient.splice(index, 1)
    setLocalStorage(dbClient)
}   

function updateClient(index, client) {
    var dbClient = getLocalStorage()
    dbClient[index] = client
    setLocalStorage(dbClient)
}

//

function saveClient() {
    var client = {
        nome: $('#nome').val(),
        funcao: $('#funcao').val(),
        salario: $('#salario').val()
    }
    createCLi(client)
    updateTable()
}

function updateTable() {
    var dbClient = getLocalStorage()
    clearTable()
    dbClient.forEach(createTr)
}

function createTr(client, index) {
    var newTr = document.createElement('tr')
    newTr.innerHTML = `
        <th>${client.nome}</th>
        <th>${client.funcao}</th>
        <th>${client.salario}</th>
        <th class="d-flex justify-content-end">
            <div class="btn-group">
                <button type="button" id="btnEdit-${index}" class="btn btn btn-primary">
                    editar</button>
                <button type="button" id="btnDel-${index}" class="btn btn btn-danger">
                    excluir</button>
            </div>
        </th>`
    $('#tableFun>tbody').append(newTr)
}

function clearTable() {
    var rows = document.querySelectorAll('#tableFun>tbody tr')
    rows.forEach(row => row.parentNode.removeChild(row))
}


const editDelete = (e) => {
    if (e.target.type == 'button') {
        const [action, index] = e.target.id.split('-')
        if(action == 'btnEdit'){
            editFun(index)
        }else{
            console.log('del ');
        }
    }
}

const editFun = (index) => {
    const client = getLocalStorage()[index]
}

