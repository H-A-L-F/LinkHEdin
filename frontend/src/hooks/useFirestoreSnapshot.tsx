import { FirestoreError, onSnapshot } from "firebase/firestore"
import { useEffect, useReducer } from "react"

export const FIRESTORE_FETCH_IDLE = '[firestore] idle'
export const FIRESTORE_FETCH_LOADING = '[firestore] loading'
export const FIRESTORE_FETCH_SUCCESS = '[firestore] success'
export const FIRESTORE_FETCH_ERROR = '[firestore] error'

type action = {
    type: string,
    payLoad?: any
}

export const firestoreFetchIdle = {
    type: FIRESTORE_FETCH_IDLE
}

export const firestoreFetchLoading = {
    type: FIRESTORE_FETCH_LOADING
}

export const firestoreFetchSuccess = (data: any) => ({
    type: FIRESTORE_FETCH_SUCCESS,
    payLoad: data
})

export const firestoreFetchError = (error: FirestoreError) => ({
    type: FIRESTORE_FETCH_ERROR,
    payLoad: error
})

const reducer = (state: any, action: action) => {
    switch (action.type) {
        case FIRESTORE_FETCH_IDLE:
            return { status: FIRESTORE_FETCH_IDLE, data: undefined, error: undefined };
        case FIRESTORE_FETCH_LOADING:
            return { status: FIRESTORE_FETCH_LOADING, data: undefined, error: undefined };
        case FIRESTORE_FETCH_SUCCESS:
            return { status: FIRESTORE_FETCH_SUCCESS, data: action.payLoad, error: undefined };
        case FIRESTORE_FETCH_ERROR:
            return { status: FIRESTORE_FETCH_ERROR, data: undefined, error: action.payLoad };
        default:
            throw new Error("invalid action");
    }
}

export function useSnapCollection(ref: any, filterAuth?: any, user?: any) {
    const initialState = {
        status: ref ? FIRESTORE_FETCH_LOADING : FIRESTORE_FETCH_IDLE,
        data: undefined,
        error: undefined,
    }

    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        dispatch(firestoreFetchLoading);
        return onSnapshot(ref,
            (response: { docs: any }) => {
                const data = filterAuth !== undefined ?
                    response.docs
                        ? getFilterCollectionData(response, filterAuth, user)
                        : getFilterDocData(response, filterAuth, user)
                    :
                    response.docs
                        ? getCollectionData(response)
                        : getDocData(response)
                dispatch(firestoreFetchSuccess(data))
            },
            (error) => {
                dispatch(firestoreFetchError(error))
            }
        );
    }, []);

    return state;
}

function getDocData(doc: any) {
    return doc ? { id: doc.id, ...doc.data() } : null
}

function getCollectionData(collection: any) {
    return collection.docs.map(getDocData);
}

function getFilterDocData(doc: any, filterAuth: any, user: any) {
    if (doc && user?.length > 0) {
        return filterAuth(user, doc.id) === true ? { id: doc.id, ...doc.data() } : null
    }
    return null
}

function getFilterCollectionData(collection: any, filterAuth: any, user: any) {
    const temp = collection.docs.map((doc: any) => { return getFilterDocData(doc, filterAuth, user) })
    let res: any[] = []
    temp.forEach((element: any) => {
        if (element !== null) res.push(element)
    })
    return res
}