import { ChevronRightIcon } from '@heroicons/react/24/outline';
import React from 'react';
import Button from '~/core/ui/Button';
import { TextFieldInput, TextFieldLabel } from '~/core/ui/TextField';
import Textarea from '~/core/ui/Textarea';

function ProductForm({
  formData,
  setFormData,
  handleProductSubmit,
  loading,
}: any) {
  return (
    <form onSubmit={handleProductSubmit} className="h-full flex flex-col">
      <div className="grid grid-cols-1 md:gap-10 gap-4 md:grid-cols-2">
        <div>
          <TextFieldLabel>
            Product Name
            <TextFieldInput
              placeholder="Enter Product name"
              value={formData.productName}
              onChange={(e: any) =>
                setFormData({
                  ...formData,
                  productName: e.target.value,
                })
              }
              required
            />
          </TextFieldLabel>
        </div>
        <div>
          <TextFieldLabel>
            Product Website URL
            <TextFieldInput
              placeholder="Enter Product Website URL"
              value={formData.productWebsiteURL}
              onChange={(e: any) =>
                setFormData({
                  ...formData,
                  productWebsiteURL: e.target.value,
                })
              }
              required
            />
          </TextFieldLabel>
        </div>
        <div>
          <TextFieldLabel>
            Product Description
            <Textarea
              className="h-28"
              placeholder="Enter Product Description"
              value={formData.productDescription}
              onChange={(e: any) =>
                setFormData({
                  ...formData,
                  productDescription: e.target.value,
                })
              }
              required
            />
          </TextFieldLabel>
        </div>
        <div>
          <TextFieldLabel>
            Product Pricing URL
            <TextFieldInput
              placeholder="Enter Product Pricing URL"
              value={formData.productPricingURL}
              onChange={(e: any) =>
                setFormData({
                  ...formData,
                  productPricingURL: e.target.value,
                })
              }
              required
            />
          </TextFieldLabel>
        </div>
      </div>
      <div className="flex md:mt-auto md:ml-auto md:mr-0 mx-auto mt-6">
        <Button type="submit" loading={loading} disabled={loading}>
          Next Step
          <ChevronRightIcon className="w-4 h-4" />
        </Button>
      </div>
    </form>
  );
}

export default ProductForm;
