import { IComparableWithOperators } from "@drozdik.m/common-interfaces/IComparableWithOperators"
import { IComparable } from "@drozdik.m/common-interfaces/IComparable"
import { IComparator } from "@drozdik.m/common-interfaces/IComparator"

export class Version implements IComparableWithOperators<Version>
{
    protected major: number;
    protected minor: number;
    protected patch: number;

    /**
     * Creates new Version object
     * @param major Major version number
     * @param minor Minor version number
     * @param patch Patch version number
     */
    constructor(major: number, minor: number, patch: number)
    {
        this.major = major;
        this.minor = minor;
        this.patch = patch;
    }

    /**
     * Returns the major version number
     * */
    public Major(): number
    {
        return this.major;
    }

    /**
     * Returns the minor version number
     * */
    public Minor(): number
    {
        return this.minor;
    }

    /**
     * Returns the patch version number
     * */
    public Patch(): number
    {
        return this.patch;
    }

    GetComparator(): IComparator<Version>
    {
        return function (version1: Version, version2: Version): number
        {
            if (version1.major < version2.major)
                return -1;
            else if (version1.major > version2.major)
                return 1;

            if (version1.minor < version2.minor)
                return -1;
            else if (version1.minor > version2.minor)
                return 1;

            if (version1.patch < version2.patch)
                return -1;
            else if (version1.patch > version2.patch)
                return 1;

            return 0;
        }
    }

    CompareTo(obj: Version): number
    {
        return this.GetComparator()(this, obj);
    }

    Equals(obj: Version): boolean
    {
        return this.GetComparator()(this, obj) == 0;
    }

    LessThan(obj: Version): boolean
    {
        return this.GetComparator()(this, obj) < 0;
    }

    GreaterThan(obj: Version): boolean
    {
        return this.GetComparator()(this, obj) > 0;
    }

    toString(): string
    {
        return `${this.major.toString()}.${this.minor.toString()}.${this.patch.toString()}`;
    }

    /**
     * Returns Version object based on a string. 
     * Version -1 is filled if value is not parsed correctly. 
     * Version 0 is fileld if value is not found.
     * */
    static FromString(string: string): Version
    {
        let versions = string.split(".");
        let major = typeof versions[0] == "undefined" ? -1 : parseInt(versions[0]);
        let minor = typeof versions[1] == "undefined" ? 0 : parseInt(versions[1]);
        let patch = typeof versions[2] == "undefined" ? 0 : parseInt(versions[2]);

        if (isNaN(major))
            major = -1;
        if (isNaN(minor))
            minor = -1;
        if (isNaN(patch))
            patch = -1;
        return new Version(major, minor, patch);
    }
}




