import Header from "components/Header"

const CreateCategory = () => {
    return (
        <Header>
            <form className="form-control">
                <label className="text-center label">
                    <span className="font-bold uppercase">Nova Categoria</span>
                </label> 
                <input type="text" placeholder="nome" className="input input-bordered" />
                <div className='my-4 sm:flex'>
                    <button type='submit' className="mr-6 btn btn-wide btn-sm">Salvar</button>
                    <button type='submit' className="mr-6 btn btn-outline btn-wide btn-sm">Cancelar</button>
                </div>
            </form>
        </Header>
    )
}

export default CreateCategory