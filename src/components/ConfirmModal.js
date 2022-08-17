function ConfirmModal({toggleConfirmModal, tripKey, handleRemoveTrip}) {
  return (
    <div className="modal">
        <div className="overlay">
            <div className="modalContent confirmModal">
                <p>Are you sure you want to proceed? This change is irreversible.</p>
                <div className="choiceButtons">
                  <button onClick={(e) => handleRemoveTrip(tripKey)}>Yes</button>
                  <button onClick={(e) => toggleConfirmModal(e)}>No</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ConfirmModal;