import Header from "components/Header"
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAuth } from "context/auth";
import { supabase } from "services/supabase";
import { useToasts } from "react-toast-notifications";
import { useNavigate } from "react-router";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";



type LocationState = {
      created_at: string
      id: number
      name: string
      user_id: string
}

type Inputs = {
    name: string,
  };


  const schema = yup.object({
    name: yup.string().required('Campo obrigatório'),
  }).required();

const CreateCategory = () => {

    const { addToast } = useToasts();
    const navigate = useNavigate();

    const location = useLocation()
    const state = location.state as LocationState;

    const {
        user: {id}
    } = useAuth()

    
    const { register, handleSubmit, reset, formState: { errors } } = useForm<Inputs>({
      resolver: yupResolver(schema)
    });
    
    const [loading, setLoading] = useState(false)
    const [name, setName] = useState(state ? state.name : '')

      const createCategory: SubmitHandler<Inputs> = async (name: Inputs) => {
        setLoading(true)

         const { error } = await supabase.from('category')
         .insert({name: name.name, user_id: id}).single()

        if(error){
            return addToast(error.message, { appearance: 'error',  autoDismiss: true });  
          } else {
            addToast('Categoria criada com sucesso!', { appearance: 'success',  autoDismiss: true });
            reset( {name: ''} )
            navigate('/categorias');
          }
          setLoading(false)  
      };

      const editCategory: SubmitHandler<Inputs> = async (name: Inputs) => {
      
         setLoading(true)

         const { data, error } = await supabase.from('category')
         .update({name: name.name })
         .eq(`name`, state.name)
         

        if(error){
            return addToast(error.message, { appearance: 'error',  autoDismiss: true });  
          } else {
            addToast('Categoria atualizada com sucesso!', { appearance: 'success',  autoDismiss: true });
            reset( {name: ''} )
            navigate('/categorias');
          }
          setLoading(false)   
      };

    return (
        <Header>
            <form onSubmit={handleSubmit(state ? editCategory : createCategory)} className="form-control">
                <label className="text-center label">
                    <span className="font-bold uppercase mb-7"> {state ? 'Editar' : 'Nova'} Categoria </span>
                </label> 
                {errors.name?.message && <p className='absolute mt-10 text-sm text-red-500'>* {errors.name?.message}</p> }
                <input 
                    type="text" 
                    placeholder='nome'
                    className="input input-bordered" {...register('name')}
                    onChange={event => setName(event.target.value)}
                    value={name}
                />
                <div className='my-4 sm:flex'>
                    {!loading ? (
                            <button type='submit' className="mb-2 mr-6 btn-block btn sm:btn-wide btn-sm">{state ? 'Atualizar' : 'Salvar'}</button>
                        ) : (
                            <button type="submit" className="mb-2 mr-6 btn-block btn sm:btn-wide btn-sm loading disabled"></button> 
                        )
                    }
                    <Link to={'/categorias'} >
                        <button type='submit' className="mr-6 btn-block btn btn-outline sm:btn-wide btn-sm">Cancelar</button>
                   </Link>
                </div>
            </form>
        </Header>
    )
}

export default CreateCategory