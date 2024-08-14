import Swal from 'sweetalert2'

export const swalPopup = async (e, book) => {
  try {
    const result = await Swal.fire({
      title: 'Edit Book',
      html: `
        <input id="swal-input1" class="swal2-input" placeholder="Title" value="${book?.title}">
        <input id="swal-input2" class="swal2-input" placeholder="Author" value="${book?.author}">
      `,
      showCancelButton: true,
      confirmButtonText: 'Edit',
      cancelButtonText: 'Cancel',
      preConfirm: () => {
        const title = document.getElementById('swal-input1').value
        const author = document.getElementById('swal-input2').value
        if (!title || !author) {
          Swal.showValidationMessage('Both fields are required')
          return false
        }
        return { title, author }
      }
    })
    // Return the result value if confirmed
    if (result.isConfirmed) {
      return result.value
    } else {
      return null
    }
  } catch (error) {
    return null
  }
}
