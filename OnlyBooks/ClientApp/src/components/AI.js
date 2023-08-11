import React, { useState } from 'react';
import axios from 'axios';


const AI = ({ bookDescription }) => {
    const [annotation, setAnnotation] = useState('');

    const generateAnnotation = async () => {
        try {
            const response = await axios.post(
                'https://api.openai.com/v1/engines/text-davinci-003/completions',
                {
                    prompt: bookDescription,
                    max_tokens: 20, // Максимальная длина аннотации
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer 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',
                    },
                }
            );

            setAnnotation(response.data.choices[0].text.trim());
        } catch (error) {
            console.error('Error generating annotation:', error);
        }
    };

    return (
        <div>
            {generateAnnotation}
            {annotation && <p>{annotation}</p>}
        </div>
    );
};

export default AI;
