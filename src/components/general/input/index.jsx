export default function Input({ placeholder, value, onChange }){
    return(
        <input
              className="bg-gray-50 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder={placeholder}
              value={value}
              onChange={onChange}
        />
    )
}