import Header from "components/Header"
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useToasts } from "react-toast-notifications";
import { useNavigate } from "react-router";
import { useAuth } from "context/auth";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { supabase } from "services/supabase";

type LocationState = {
    created_at: string
    id: number
    name: string
    user_id: string
}

type Inputs = {
    name: string,
    description: string
    amount: number
    price: number
    category_id: number
  };

  type Category = {
    created_at: Date
    id: number
    name: string
    user_id: string
}

  
const schema = yup.object({
    name: yup.string().required('Campo nome obrigatório'),
    description: yup.string().required('Campo descrição obrigatório'),
    amount: yup.number().typeError('Campo quantidade obrigatório'),
    price: yup.number().typeError('Campo preço obrigatório'),
    category_id: yup.number().typeError('Campo categoria obrigatório'),
}).required();
  

const CreateProduct = () => {

    const { addToast } = useToasts();
    const navigate = useNavigate();
    const location = useLocation()
    const state = location.state as LocationState;

    const { register, handleSubmit, reset, formState: { errors } } = useForm<Inputs>({
        resolver: yupResolver(schema)
      });

    
      const {
        user: {id}
    } = useAuth()

    const auth = useAuth()

    
    const [loading, setLoading] = useState(false)
    const [name, setName] = useState(state ? state.name : '')
    const [categories, setCategories] = useState<Category[] | null>(null)
    const [product, setProduct] = useState()


    const getCategories = async () => {
        const { data, error} = await supabase.from('category')
        .select('*')
        .eq('user_id', auth.user.id)
        
        if(error){
            addToast(error.message, { appearance: 'error',  autoDismiss: true });  
        }
          
          setCategories(data)
    }

    const createProduct = async (data: Inputs) => {
        setLoading(true)

        console.log({...data,  user_id: id })

        const { error } = await supabase.from('product')
        .insert({...data,  user_id: id }).single()

       if(error){
           return addToast(error.message, { appearance: 'error',  autoDismiss: true });  
         } else {
           addToast('Categoria criada com sucesso!', { appearance: 'success',  autoDismiss: true });
           reset( {name: ''} )
           navigate('/produtos');
         }
         setLoading(false)  
     };
    

    const editProduct = () => {
        
    }
    
    useEffect(() => {
        getCategories()
    }, [])

    return (
      <Header>
           <form onSubmit={handleSubmit(state ? editProduct : createProduct)} className="form-control">
                <label className="text-center label">
                    <span className="font-bold uppercase mb-7"> {state ? 'Editar' : 'Novo'} Produto </span>
                </label> 
                <label className="label">
                    <span className="label-text">Nome</span>
                    {errors.name?.message && <p className='text-sm text-red-500 '>* {errors.name?.message}</p> }
                </label>
                <input 
                    type="text" 
                    placeholder='nome do produto'
                    className="mb-2 input input-bordered" 
                    {...register('name')}
                    onChange={event => setName(event.target.value)}
                    value={name}
                />
                <label className="label">
                    <span className="label-text">Descrição</span>
                    {errors.description?.message && <p className='text-sm text-red-500 '>* {errors.description?.message}</p> }
                </label>
                <textarea 
                    className="mb-2 textarea textarea-bordered" 
                    placeholder="descrição do produto"
                    {...register('description')}
                >
                </textarea>
                <label className="label">
                    <span className="label-text">Quantidade</span>
                    {errors.amount?.message && <p className='text-sm text-red-500 '>* {errors.amount?.message}</p> }
                </label>
                <input 
                    type="number" 
                    placeholder='quantidade de produto'
                    className="mb-2 input input-bordered"
                    {...register('amount')}
                />
                 <label className="label">
                    <span className="label-text">Preço</span>
                    {errors.price?.message && <p className='text-sm text-red-500 '>* {errors.price?.message}</p> }
                </label>
                <input 
                    type="number" 
                    placeholder='preço do produto'
                    className="mb-2 input input-bordered"
                    {...register('price')}
                />
                {categories?.length !== 0 && categories !== null && (
                    <>
                        <label className="label">
                            <span className="label-text">Categoria</span>
                        </label>
                        <select className="w-full bg-gray-100 select"  {...register('category_id')}>
                            {categories && categories.map(category => (
                                <>
                              <option value={category.id} >{category.name}</option>
                                </>
                            ))}
                        </select>
                        <div className='my-4 sm:flex'>
                            {!loading ? (
                                    <button type='submit' className="mb-2 mr-6 btn-block btn sm:btn-wide btn-sm">{state ? 'Atualizar' : 'Salvar'}</button>
                                ) : (
                                    <button type="submit" className="mb-2 mr-6 btn-block btn sm:btn-wide btn-sm loading disabled"></button> 
                                )
                            }
                            <Link to={'/produtos'} >
                                <button type='submit' className="mr-6 btn-block btn btn-outline sm:btn-wide btn-sm">Cancelar</button>
                            </Link>
                        </div>
                    </>
                )}
                {categories?.length === 0 && (
                    <>
                     <h3 className='my-4 font-semibold text-center'>Nenhuma Categoria Cadastrada</h3>
                     <Link to={'/adicionar-categoria'}>
                        <button className="mb-2 mr-6 btn-block btn btn-sm">Criar Categoria</button>
                     </Link>
                    </>
                )}

            </form>
      </Header>
    )
}

export default CreateProduct