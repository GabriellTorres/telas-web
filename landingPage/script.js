$(document).ready( function(){
    
    $(document).on('click', '.icon-menu', abrirMenu);
    $(document).on('click', '.btn-close', fecharMenu)
})

function abrirMenu(){
    console.log("Menu aberto")

    let body = $("body");

    let menu = `

        <div class="div-menu bg-dark bg-opacity-50 w-100 h-100 position-fixed top-0 start-0">

            <button type="button" class="btn-close btn-close-white position-absolute top-0 end-0 m-3" aria-label="Fechar"> </button>

            <div class="menu bg-light p-4 rounded shadow"> 
                <h2 class="titulo-header fw-bold"> TITULO </h2>
                <nav class="d-flex flex-column gap-3">
                    <a href="#" class="link-qualquer fw-semibold fs-5 ">Home</a>
                    <a href="#" class="link-qualquer fw-semibold fs-5 ">Features</a>
                    <a href="#" class="link-qualquer fw-semibold fs-5 ">Sobre nós</a>
                </nav>
            </div>
        </div>
    
    `

    body.append(menu);
}

function fecharMenu(){
    $(this).closest(".div-menu").remove();
}