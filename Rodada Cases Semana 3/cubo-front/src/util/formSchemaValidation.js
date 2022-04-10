import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const mode = 'all';

const defaultValues = {
    firstName: '',
    lastName: '',
    participation: null,

};

const formSchemaValidation = {
    mode,
    defaultValues,
    resolver: yupResolver(
        yup.object().shape({
            firstName:yup.string().required('O campo nome é obrigatório'),
            lastName: yup.string().required('O campo sobrenome é obrigatório'),
            participation: yup.number()
                .typeError('O valor deve ser um número')
                .required('O campo participação é obrigatório')
                .positive("O número deve ser positivo."),
        }).required()
    )
};

export default formSchemaValidation; 