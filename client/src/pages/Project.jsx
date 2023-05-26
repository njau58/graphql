import React from 'react'
import  {useParams, Link} from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { GET_PROJECT } from '../queries/projectQueries'
import Spinner from '../components/Spinner'
import ClientInfo from '../components/ClientInfo'
import EditProjectForm from '../components/EditProjectForm'
import DeleteProjectButton from '../components/DeleteProjectButton'


const Project = () => {
    const {id} = useParams()
    const {loading, error, data} = useQuery(GET_PROJECT,
        {
            variables:{id:id}
        })
  

        if (loading) return <div style={{marginTop:'20px'}}><Spinner /></div> ;
        if (error) return <p>Something Went Wrong</p>;
      
        return (
          <>
            {!loading && !error && (
              <div className='mx-auto   shadow-sm card p-5 pt-5' style={{marginTop:'20px'}}>
                <Link to='/' className='btn btn-light btn-sm w-12 d-inline ms-auto'>
                  Back
                </Link>
      
                <h1>{data.project.name}</h1>
                <p>{data.project.description}</p>
      
                <h5 className='mt-3 '>Project Status</h5>
               <div className='w-5'>
               <p className={`${data.project.status==='Not Started'?'badge bg-danger ':
                data.project.status==='In Progress'?'badge bg-primary ':' badge bg-success'
                }`}
                
                >{data.project.status}</p></div> 
      
                 <ClientInfo client={data.project.client} />
      
                <EditProjectForm project={data.project} />
      
                <DeleteProjectButton projectId={data.project.id} /> 
              </div>
            )}
          </>
        );
      }
      export default Project