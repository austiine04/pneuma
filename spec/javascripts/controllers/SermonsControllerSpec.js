describe('SermonsController', function () {
    it('should have a sermon model');
    describe('save', function () {
        it('should user sermon service to save sermons');
        describe('success', function () {
            it('should redirect to sermon details page on success');
            it('should display success message');
        });
        describe('error', function () {
            it('should remain at the sermon form when saving fails');
            it('should display error message');
        });
    });
});
