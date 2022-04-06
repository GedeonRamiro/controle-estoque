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
import { FaUpload } from 'react-icons/fa';
import { v4 as uuidv4 } from 'uuid';

type LocationState = {
    amount: number
    category_id: number
    created_at: string
    description: string
    id: number
    img_url: string
    name: string
    price: number
    user_id: string
}

type Inputs = {
    id: string
    img_url: {}
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

/* type Image = {
    lastModified: number
    lastModifiedDate: string
    name: string
    size: number
    type: string
    webkitRelativePath: string
} */

  
const schema = yup.object({
    //img_url: yup.string().required('Campo foto obrigatório'),
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
    const [categories, setCategories] = useState<Category[] | null>(null)
    const [name, setName] = useState(state ? state.name : '')
    const [description, setDescription] = useState(state ? state.description : '')
    const [amount, setAmount] = useState(state ? state.amount : '')
    const [price, setPrice] = useState(state ? state.price : '')
    const [categoryId, setCategoryId] = useState(state ? state.category_id : '')
    const [file, setFile] = useState<File>({} as File)
    const [imageURL, setImageURL] = useState<string | ''>('')

    const getCategories = async () => {
        const { data, error} = await supabase.from('category')
        .select('*')
        .eq('user_id', auth.user.id)
        
        if(error){
            addToast(error.message, { appearance: 'error',  autoDismiss: true });  
        }
          
          setCategories(data)
    }

    const up = (e: any) => {
        setFile(e.target.files[0])
    }

    const createProduct = async (dataForm: Inputs) => {
      
        setLoading(true)

        const fileName = uuidv4();    
        const { data } = await supabase
        .storage
        .from('products')
        .upload(fileName, file, {
            cacheControl: '3600',
            upsert: false
        });

        setImageURL(String(data?.Key))

        const { publicURL } = supabase
        .storage
        .from('products')
        .getPublicUrl(imageURL)

         
     const { error } = await supabase.from('product')
        .insert({...dataForm,  user_id: id  , img_url: publicURL+`${fileName}` }).single()

       if(error){
            setLoading(false)
           return addToast(error.message, { appearance: 'error',  autoDismiss: true });  
         } else {
           addToast('Categoria criada com sucesso!', { appearance: 'success',  autoDismiss: true });
           reset( {name: ''} )
           navigate('/produtos');
         }  
         setLoading(false)
     };
    

     const editProduct: SubmitHandler<Inputs> = async (dataEdit: Inputs) => {
      
        setLoading(true)

        const { data } = await supabase
        .storage
        .from('products')
        .update(dataEdit.id, file, {
            cacheControl: '3600',
            upsert: false
        });

        setImageURL(String(data?.Key))

        const { publicURL } = supabase
        .storage
        .from('products')
        .getPublicUrl(imageURL)

        const { error } = await supabase.from('product')
        .update(dataEdit)
        .match({...state, img_url: publicURL+`${state.id}` })
        

       if(error){
           return addToast(error.message, { appearance: 'error',  autoDismiss: true });  
         } else {
           addToast('Produto atualizado com sucesso!', { appearance: 'success',  autoDismiss: true });
           reset( {name: ''} )
           navigate('/produtos');
         }
         setLoading(false)   
     };
    
    useEffect(() => {
        if(auth.user.id) {
            getCategories()
        }

          // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [auth])

    return (
        <Header>
           <form onSubmit={handleSubmit(state ? editProduct : createProduct)} className="form-control">
                <label className="text-center label">
                    <span className="font-bold uppercase mb-7"> {state ? 'Editar' : 'Novo'} Produto </span>
                </label> 
                {state ? (
                     <img src={state.img_url} alt={state.name} className='w-full mb-10'/>
                ) : (
                   <>
                    <div className="flex items-center justify-center my-4 bg-grey-lighter">
                        <label className="flex flex-col items-center w-full px-4 py-6 tracking-widest text-gray-500 uppercase bg-gray-100 border rounded-lg cursor-pointer hover:bg-gray-700 hover:text-white">
                            <FaUpload size={24} />
                            <span className="mt-2 text-sm leading-normal">carregar imagem</span>
                            <input 
                                type='file'
                                //{...register('img_url')}  
                                name='image' 
                                className="hidden"
                                onChange={up}
                                />
                        </label>
                    </div>
                    {file.name && <img className='w-full mb-10' src={URL.createObjectURL(file)} alt={file.name} /> }
                    </>
                )}
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
                    onChange={event => setDescription(event.target.value)}
                    value={description}
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
                    onChange={event => setAmount(event.target.value)}
                    value={amount}
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
                    onChange={event => setPrice(event.target.value)}
                    value={price}
                />
                {categories?.length !== 0 && categories !== null && (
                    <>
                        <label className="label">
                            <span className="label-text">Categoria</span>
                        </label>
                        <select className="w-full bg-gray-100 select"  {...register('category_id')} onChange={event => setCategoryId(event.target.value)} value={categoryId}>
                            {categories && categories.map(category => (
                                <>
                              <option  value={category.id} >{category.name}</option>
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