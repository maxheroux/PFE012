
class Domicile(object):


    def __init__(self, domicileId = 0, token = ""):
        self.domicileId = domicileId
        self.token = token

    @staticmethod
    def domicile_object_hook(d):
        domicile = Domicile(d["domicileId"], d["token"])

        return domicile
