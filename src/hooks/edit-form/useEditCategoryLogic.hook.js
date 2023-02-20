import { useEffect, useState } from 'react';
import { useCategoriesStore } from '../../app/categoriesStore';

export const useEditCategoryLogic = (item, closeForm) => {
    const [categoryName, setCategoryName] = useState('');

    const { updateCategory } = useCategoriesStore();

    useEffect(() => {
        setCategoryName(item.category);

        return () => {
            setCategoryName('');
        };
    }, []);

    const [isTooLong, setIsTooLong] = useState(false);

    const checkValueLength = value => {
        if (value.length >= 20) {
            setIsTooLong(true);
        } else {
            setIsTooLong(false);
        }
    };

    const handleChange = value => {
        setCategoryName(value);
        checkValueLength(value);
    };

    const isButtonDisabled = categoryName === '';

    const handleEdit = () => {
        updateCategory(item.id, { category: categoryName });
        closeForm(false);
    };

    return [
        categoryName,
        isTooLong,
        isButtonDisabled,
        handleChange,
        handleEdit,
    ];
};
