import React from 'react'
import { Button } from '@chakra-ui/react'
import ImageUploading from 'react-images-uploading'

// Icons
import { PhotographIcon } from '@heroicons/react/outline'

export default function AppImageUpload({ value, onChange }) {
  return (
    <ImageUploading value={value} onChange={onChange} dataURLKey="data_url">
      {({ imageList, onImageUpload, onImageRemove, onImageUpdate }) => (
        <button
          onClick={imageList.length === 0 ? onImageUpload : () => {}}
          type="button"
          className="text-gray-500 relative block w-full flex flex-col items-center border-2 border-gray-300 border-dashed rounded-lg p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {imageList.length === 0 ? (
            <React.Fragment>
              <PhotographIcon className="h-10 w-10" />
              <span className="mt-2 block text-sm font-medium text-gray-900">
                Add an image
              </span>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {imageList.map((image, idx) => (
                <div key={idx} className="flex flex-col space-y-4 items-center">
                  <img src={image['data_url']} alt="" width="200" />
                  <div className="flex space-x-4">
                    <Button
                      variant="solid"
                      colorScheme="brand.tertiary"
                      onClick={() => onImageUpdate(idx)}
                    >
                      Update
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => onImageRemove(idx)}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              ))}
            </React.Fragment>
          )}
        </button>
      )}
    </ImageUploading>
  )
}
