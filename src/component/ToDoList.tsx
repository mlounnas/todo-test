import { useEffect, useState } from "react"
import { incrementKey, State, Todo } from "../back-end/fakeBackend"
import { CContainer, CCard, CCardBody, CTooltip, CModal, CModalBody, CModalFooter, CModalHeader, CButton, CFormLabel, CFormSelect, CFormControl, CRow, CCol, CBadge } from '@coreui/react';
import { freeSet } from '@coreui/icons'
import CIcon from '@coreui/icons-react';
import { useViewport } from "../App";

interface AppendTodo {
    id:number,
    title:string,
    description:string,
    state: State
}
const ToDoList: React.FC = (props: any) => {

    const { width, height } = useViewport();
    const [toDolists, setToDoLists] = useState<Todo[]>([]);
    const [isInvalid, setIsInvalid] = useState<boolean>(false)
    const [, setError] = useState();
    const [modalUpdate, setModalUpdate] = useState<boolean>(false);
    const [modalAppend, setModalAppend] = useState<boolean>(false);
    const [messageError,setMessageError]=useState<string>("")
    const [updatedTodo, setUpdatedTodo] = useState<Todo>();
    const [appendToDo, setAppendToDo] = useState<AppendTodo>({
   
        id: incrementKey(),
        title: "",
        description: "",
        state: State.TODO
    })
    
    useEffect(() => {
        const getToDoList = async (callback: any, setError: any) => {
            await fetch('/todos', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                //   body : JSON.stringify(data)
            })
                .then(resp => resp.text())
                .then(resp => { callback(JSON.parse(resp)) })
                .catch(error => { console.log(error); setError(error) })
        }
        getToDoList(setToDoLists, setError)

    }, [])

    const removeTodo = async (id: number, callback: any) => {

        await fetch('/remove', {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: id })
        })
            .then(resp => resp.text())
            .then(resp => { callback(JSON.parse(resp)) })
            .catch(error => { console.log(error); setError(error) })
    }
    const getToDo = async (callback: any, setError: any, id: number) => {
        await fetch('/todo', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: id })
        })
            .then(resp => resp.text())
            .then(resp => { callback(JSON.parse(resp)) })
            .catch(error => { console.log(error); setError(error) })
    }

    const updateTodo = async (data: AppendTodo, callback: any) => {

        await fetch('/update', {
            method: 'UPDATE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data })
        })
            .then(resp => resp.text())
            .then(resp => { callback(JSON.parse(resp)) })
            .catch(error => { console.log(error); setError(error) })
    }

    const appendTodo = async (data: AppendTodo, callback: any) => {

        await fetch('/add', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data })
        })
            .then(resp => resp.text())
            .then(resp => { callback(JSON.parse(resp)) })
            .catch(error => { setError(error) })
        setAppendToDo(({

            id: incrementKey(),
            title: "",
            description: "",
            state: State.TODO
        }))
        toggleAppend();
    }

    const toggleAppend = (): void => {
        setModalAppend(!modalAppend);
    }
    const toggleUpdate = async () => {

        setModalUpdate(!modalUpdate);
    }
    const handleChange = (evt: any, object: any, setObject: any, name: string) => {
        if (name === 'title' && evt.target.value === "") {
            setIsInvalid(true)
        }
        else {
            object[name] = evt.target.value;
            setObject(object);
            setIsInvalid(false)
        }
    }
    const handleChangeUpdate = (evt: any, object: any, setObject: any, name: string) => {
        if (name === 'title' && evt.target.value === "") {
            setIsInvalid(true)
        }
        else {
            object.data[name] = evt.target.value;
            setObject(object);
            setIsInvalid(false)
        }

    }

    return (
        <>
            <CContainer style={{ height: height * 0.995, width: width * 0.995 }}>
                <h2>LISTE TODO</h2>
                {toDolists && toDolists.map((element: Todo,) => {
                    if (element && element.data) {
                        return (
                            <div key={element.data.id}>
                                <CCard >
                                   
                                    <CCardBody>


                                        {element.data.state === State.DONE ?
                                            <>
                                                <CRow>
                                                    <CCol xs={2}>  <CFormLabel style={{ textDecoration: 'line-through' }} className='input-label'>titre :</CFormLabel></CCol>
                                                    <CCol xs={3}><h6 style={{ fontWeight: 'bold', textDecoration: 'line-through' }}>{element.data.title}</h6></CCol>
                                                    <CCol xs={1}>  <CFormLabel style={{ textDecoration: 'line-through' }} className='input-label'>statut :</CFormLabel></CCol>
                                                    <CCol xs={2}> <CBadge style={{ textDecoration: 'line-through' }} color="danger">{element.data.state}</CBadge></CCol>

                                                </CRow>
                                                <CRow>
                                                    <CCol xs={2}>  <CFormLabel style={{ textDecoration: 'line-through' }} className='input-label'> description :</CFormLabel></CCol>
                                                    <CCol xs={8}>  <p style={{ textDecoration: 'line-through' }}>{element.data.description}</p></CCol>

                                                </CRow>
                                            </>
                                            :
                                            <>
                                                <CRow>
                                                    <CCol xs={2}>  <CFormLabel className='input-label'>titre :</CFormLabel></CCol>
                                                    <CCol xs={3}><h6 style={{ fontWeight: 'bold' }}>{element.data.title}</h6></CCol>
                                                    <CCol xs={1}>  <CFormLabel className='input-label'>statut :</CFormLabel></CCol>
                                                    <CCol xs={2}> <CBadge color="danger">{element.data.state}</CBadge></CCol>
                                                </CRow>
                                                <CRow>
                                                    <CCol xs={2}>  <CFormLabel className='input-label'> description :</CFormLabel></CCol>
                                                    <CCol xs={8}>  {element.data.description}</CCol>

                                                </CRow>
                                            </>
                                        }



                                    </CCardBody>
                                    <CButton onClick={() => props.history.push('./todo/id=' + element.data.id)}>Détails {element.data.title}</CButton>
                                </CCard>

                                <CRow>
                                    <CCol xs={1}>

                                        <CTooltip content="Update the element" placement='bottom'>
                                            <div className='menu-icon-div'> <CIcon
                                                name="Update"
                                                data-arg1={element.data.id}
                                                onClick={(e: any) => {

                                                    getToDo(setUpdatedTodo, setError, element.data.id)
                                                    toggleUpdate()


                                                    // let id: number = e.target.getAttribute('data-arg1')
                                                    // updateTodo(id,setToDoLists)
                                                }}

                                                content={freeSet.cilPencil}>
                                            </CIcon></div></CTooltip></CCol>
                                    <CCol xs={1}>
                                        <CTooltip content="Delete the element" placement='bottom'>
                                            <div className='menu-icon-div'>
                                                <CIcon
                                                    data-arg1={element.data.id}
                                                    name="Delete"
                                                    onClick={(e: any) => {
                                                        let id: number = e.target.getAttribute('data-arg1')
                                                        removeTodo(id, setToDoLists)
                                                    }}
                                                    content={freeSet.cilTrash}>
                                                </CIcon>
                                            </div>
                                        </CTooltip>


                                    </CCol>
                                </CRow>
                            </div>
                        )
                    }
                })}
                <CCol xs={1}>
                    <CTooltip content="Add an element" placement='bottom'>
                        <div className='menu-icon-div'>

                            <CIcon
                                name="append"
                                onClick={(e: any) => {
                                    toggleAppend()
                                }}
                                content={freeSet.cilPlus}>
                            </CIcon>
                        </div>
                    </CTooltip>
                </CCol>
                <CModal size='sm' visible={modalUpdate}>
                    <CModalHeader>UPDATE FORM</CModalHeader>
                    <CModalBody>
                        <CFormLabel className='input-label'>Titre</CFormLabel>
                        <span className='input-label'>*</span>
                        <CFormControl
                            defaultValue={updatedTodo && updatedTodo.data ? updatedTodo.data.title : ""}

                            invalid={isInvalid}
                            onChange={(e: any) => { handleChangeUpdate(e, updatedTodo, setUpdatedTodo, 'title') }}>

                        </CFormControl>
                        {isInvalid&&<span style={{color:'red'}}>{messageError}</span>}
                        <CFormLabel className='input-label'>Description</CFormLabel>
                        <CFormControl
                            defaultValue={updatedTodo && updatedTodo.data ? updatedTodo.data.description : ""}
                            onChange={(e: any) => { handleChangeUpdate(e, updatedTodo, setUpdatedTodo, 'description') }}>

                        </CFormControl>
                        <CFormLabel className='input-label'>Statut</CFormLabel>
                        <CFormSelect defaultValue={updatedTodo && updatedTodo.data ? updatedTodo.data.state : State.TODO} onChange={(e: any) => { handleChangeUpdate(e, updatedTodo, setUpdatedTodo, 'state') }}>
                            <option value={State.TODO} >{State.TODO}</option>
                            <option value={State.INPROGRESS} >{State.INPROGRESS}</option>
                            <option value={State.DONE} >{State.DONE}</option>

                        </CFormSelect>

                    </CModalBody>
                    <CModalFooter>
                        <CButton
                            className='CModalButton'
                            onClick={() => {
                                if (!isInvalid && updatedTodo&&updatedTodo.data) {
                                    updateTodo(updatedTodo.data, setToDoLists);
                                    toggleUpdate()
                                }
                                else {
                                    setIsInvalid(true)
                                    setMessageError("le titre doit être renseigné")
                                }
                            }}
                        >
                            Validate
                        </CButton>
                        <CButton
                            className='CModalButton'
                            onClick={() => {
                                toggleUpdate()
                                setIsInvalid(false)
                            }}
                        >Cancel
                        </CButton>
                    </CModalFooter>
                </CModal>
                <CModal size='sm' visible={modalAppend}>
                    <CModalHeader>APPEND FORM</CModalHeader>
                    <CModalBody>
                        <CFormLabel className='input-label'>Titre</CFormLabel>

                        <CFormControl
                            invalid={isInvalid}
                            onChange={(e: any) => { handleChange(e, appendToDo, setAppendToDo, 'title') }}>

                        </CFormControl>
                        {isInvalid&&<span style={{color:'red'}}>{messageError}</span>}
                        <CFormLabel className='input-label'>Description</CFormLabel>
                        <CFormControl

                            onChange={(e: any) => { handleChange(e, appendToDo, setAppendToDo, 'description') }}>

                        </CFormControl>
                        <CFormLabel className='input-label'>Statut</CFormLabel>
                        <CFormSelect defaultValue={appendToDo.state} onChange={(e: any) => { handleChange(e, appendToDo, setAppendToDo, 'state') }}>
                            <option value={State.TODO} >{State.TODO}</option>
                            <option value={State.INPROGRESS} >{State.INPROGRESS}</option>
                            <option value={State.DONE} >{State.DONE}</option>

                        </CFormSelect>

                    </CModalBody>
                    <CModalFooter>
                        <CButton
                            className='CModalButton'
                            onClick={(e: any) => {
                                if (!isInvalid && appendToDo.title!=="") {
                                    appendToDo.id = incrementKey();
                                    appendTodo(appendToDo, setToDoLists)
                                    setAppendToDo(appendToDo)
                                }
                                else{
                                    setIsInvalid(true)
                                    setMessageError("le titre doit être renseigné")
                                }

                            }}
                        >
                            Validate
                        </CButton>
                        <CButton
                            className='CModalButton'
                            onClick={() => {
                                setIsInvalid(false)
                                toggleAppend()
                            }
                            }
                        >Cancel
                        </CButton>
                    </CModalFooter>
                </CModal>
            </CContainer>
        </>)
}
export default ToDoList

