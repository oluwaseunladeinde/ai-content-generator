"use client";

import { useState } from 'react';

import { ArrowLeft } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { FormSection } from '../_components/FormSection';
import { DisplayOutputSection } from '../_components/DisplayOutputSection';
import { TEMPLATE, TEMPLATELIST } from '@/app/(data)/templates';
import Link from 'next/link';
import { AIModel } from '@/utils/AIModel';

interface TemplateProps {
    params: {
        slug: string;
    }
};

const CreateContentPage = (props: TemplateProps) => {

    const [isLoading, setIsLoading] = useState(false);
    const [aiOutput, setAIOutput] = useState<string>('');

    const selectedTemplate: TEMPLATE | undefined = TEMPLATELIST?.find((template) => template.slug === props.params.slug);

    const generateAIContent = async (formData: any) => {
        setIsLoading(true);
        try {
            const aiPrompt = `${JSON.stringify(formData)},${selectedTemplate?.aiPrompt!}`;

            const result = await AIModel.generateContent(aiPrompt);
            const response = result.response;
            const text = response.text();
            console.log(text);
            setAIOutput(text);
            setIsLoading(false);
        } catch (error) {
            console.log("the error is ", error);
            setIsLoading(false);
            setAIOutput('');
        }

    }

    return (
        <div className='p-10 gap-y-4'>
            <Link href={"/dashboard"}>
                <Button><ArrowLeft /> Back</Button>
            </Link>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-5 py-5'>
                <FormSection
                    selectedTemplate={selectedTemplate}
                    userFormInput={(v: any) => generateAIContent(v)}
                    loading={isLoading}
                />
                <div className='col-span-2'>
                    <DisplayOutputSection aiOutput={aiOutput} />
                </div>
            </div>
        </div>
    )
}

export default CreateContentPage;